const fs = require("fs");
const path = require("path");
const csv = require("fast-csv");
const axios = require("axios");

const fileName = "File_name_here.csv";
const apiKey = "Your_Personal_API_Token_Here";

const csvStream = csv
  .parse({ headers: true, delimiter: ";" })
  .transform(async (row, callback) => {
    const url = `https://vainuio.pipedrive.com/v1/persons/${row.Merge_ID}/merge?api_token=${apiKey}`;
    const data = {
      id: row.Merge_ID,
      merge_with_id: row.Merge_With_ID,
    };
    try {
      row.response = await axios.put(url, data);
    } catch (error) {
      row.error = error;
    } finally {
      setTimeout(() => callback(null, row), 200);
    }
  });

fs.createReadStream(path.resolve(__dirname, fileName))
  .pipe(csvStream)
  .on("data", (row) => {
    if (row.error) console.error("Error: ", row.error.response.data);
    else console.log("Success:", row.Person_Name);
  })
  .on("error", (error) => console.error(error))
  .on("end", (rowCount) => console.log(`Parsed ${rowCount} rows`));
