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

  public static formatMessage = (
    message: string,
    params: Record<string, string>,
  ) => {
    return message.replace(
      /\{\{([^}]+)\}\}/g,
      (match, p1) => params[p1] || match || "",
    );
  };
}

export default Yarn;
