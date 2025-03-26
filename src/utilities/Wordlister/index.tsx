class Wordlister {
  public static getStatusColor(status: WordlistStatus) {
    return this.statusColors[status];
  }

  private static statusColors = {
    IMPORTED: "bg-amber-500 text-amber-500",
    DOWNLOADING: "bg-indigo-500 text-indigo-500",
    DOWNLOADED: "bg-blue-500 text-blue-500",
    VALIDATING: "bg-pink-500 text-pink-500",
    VALIDATED: "bg-dream-500 text-dream-500",
    ANALYZING: "bg-green-500 text-green-500",
    FAILED: "bg-red-500 text-red-500",
  };
}

export default Wordlister;
