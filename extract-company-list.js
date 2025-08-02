const xlsx = require("xlsx");
const path = require("path");

function getCompanyList() {
  const workbook = xlsx.readFile(path.resolve(__dirname, "company_invested.xlsx"));
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });
  const companyList = data.flat().filter(Boolean).map((name) => name.toLowerCase().trim());
  return companyList;
}

module.exports = getCompanyList;


// ✅ Test this module standalone
if (require.main === module) {
  const companies = getCompanyList();
  console.log("Total companies found:", companies.length);
  console.log(companies.slice(0, 10)); // Show first 10 for verification
}