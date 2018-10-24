# Pipedrive
Pipedrive API hacks

## For the "Merge_Pipedrive_Duplicate_Contacts.js"

1. Have a CSV file named "FINAL_Duplicate_People_Pipedrive_Fixing.csv" with eight columns, named in the header as Merge_With_ID;Person_Name;Person_Email;Person_Organization;Merge_ID;Person2_Name;Person2_Email;Person2_Organization.

2. As stated in the row 31, the CSV file is split by ";". If your CSV is split by "," replace ";" with ",".

3. As stated in the row 33, replace the "Your_Personal_API_Token_Here" with your Personal API Token from Pipedrive.

4. Run with your Node app (npm install && node app.js) 
