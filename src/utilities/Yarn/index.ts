/**
 * A String utility
 */
class Yarn {
  public static getInitials = (name: string): string => {
    return name
      .split(" ")
      .map((n) => n?.[0]?.toUpperCase() ?? "?")
      .slice(0, 2)
      .join("");
  };
}

export default Yarn;
