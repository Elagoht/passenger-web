export class Strength {
  private static readonly MIN_LENGTH = 8;
  private static readonly MAX_SCORE = 100;
  private static readonly MIN_VALID_SCORE = 60;
  private readonly dict: Dict;
  private readonly CHECKS: StrengthCheck[];

  public constructor(dict: Dict) {
    this.dict = dict;
    this.CHECKS = [
      {
        check: (pass: string) => !/\d/.test(pass),
        penalty: 20,
        message: this.dict.strength.checks.numbers,
      },
      {
        check: (pass: string) => !/[A-Z]/.test(pass),
        penalty: 20,
        message: this.dict.strength.checks.uppercase,
      },
      {
        check: (pass: string) => !/[a-z]/.test(pass),
        penalty: 20,
        message: this.dict.strength.checks.lowercase,
      },
      {
        check: (pass: string) => !/[!@#$%^&*(),.?":{}|<>]/.test(pass),
        penalty: 20,
        message: this.dict.strength.checks.special,
      },
      {
        check: (pass: string) => Strength.checkRepeatedCharacters(pass),
        penalty: 10,
        message: this.dict.strength.checks.repeated,
      },
      {
        check: (pass: string) => Strength.hasSequentialCharacters(pass),
        penalty: 15,
        message: this.dict.strength.checks.sequential,
      },
    ];
  }

  public evaluate(passphrase: string): StrengthResult {
    // Basic length check
    if (passphrase.length < Strength.MIN_LENGTH) {
      return {
        score: 0,
        isValid: false,
        feedback: [
          this.dict.strength.checks.minLength.replace(
            "{{minLength}}",
            Strength.MIN_LENGTH.toString(),
          ),
        ],
      };
    }

    let score = Strength.MAX_SCORE;
    const feedback: string[] = [];

    // Run all checks
    for (const { check, penalty, message } of this.CHECKS) {
      if (check(passphrase)) {
        score -= penalty;
        feedback.push(message);
      }
    }

    score = Strength.normalizeScore(score);

    return {
      score,
      isValid: score >= Strength.MIN_VALID_SCORE,
      feedback: feedback.length ? feedback : [this.dict.strength.checks.strong],
    };
  }

  private static normalizeScore(score: number): number {
    return Math.max(0, Math.min(score, this.MAX_SCORE));
  }

  private static readonly SEQUENCES = [
    "abcdefghijklmnopqrstuvwxyz",
    "qwertyuiop",
    "asdfghjkl",
    "zxcvbnm",
    "1234567890",
  ] as const;

  private static checkRepeatedCharacters(passphrase: string): boolean {
    const charCount: { [key: string]: number } = {};
    for (const char of passphrase) {
      charCount[char] = (charCount[char] || 0) + 1;
      if (charCount[char] > 2) return true;
    }
    return false;
  }

  private static hasSequentialCharacters(passphrase: string): boolean {
    const lowercasePass = passphrase.toLowerCase();
    return this.SEQUENCES.some((sequence) => {
      for (let i = 0; i < sequence.length - 2; i++) {
        const pattern = sequence.slice(i, i + 3);
        if (lowercasePass.includes(pattern)) return true;
      }
      return false;
    });
  }
}
