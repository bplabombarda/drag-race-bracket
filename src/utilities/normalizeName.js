function normalizeName(str = "") {
  return str.replace(/ .*/, "").toLowerCase();
}

export default normalizeName;
