Number.prototype.toDatePad = function (): string {
  return this.toString().padStart(2, "0");
};

Number.prototype.toYearSubstr = function (): string {
  return this.toString().substring(2);
};

Number.prototype.to2Fixed = function (): string {
    return this.toFixed(2);
};