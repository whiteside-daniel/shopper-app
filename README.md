# shopper-app
dan and brian shopper app
version 1.2 of this software has been updated to parse a txt file (previously parsed a pre-formatted csv file) and uses INSERT function to MySQL database. This code hasn't been tested for edge-cases or breaking.


node: v16.18.0-- standard npm project installation. I added "type": "module" to the package.json file


neat-csv: v7.0.0--   ... neat-csv parses a .csv file into JSON object
The JSON Object of the parsed csv file is structured something like this:



{       ## MAIN OBJECT BRACKET ##

    {
      '1': 'HK23092847',
      '2': 'OROURKE, ROBERT',
      '3': '78,000.21',
      '...': 'xxxxxxxx' ,         ## FIRST CANDIDATE IN SQL 
      '...': 'xxxxxxxx' ,           TABLE OF all_candidates ##
      '...': 'xxxxxxxx' ,
      '29': '0.00'
    },
    
    {
      '1': 'HK23092847',
      '2': 'OROURKE, ROBERT',
      '3': '78,000.21',         ## SECOND CANDIDATE/OBJECT IN .CSV 
      '...': 'xxxxxxxx' ,         TABLE OF all_candidates ##
      '...': 'xxxxxxxx' ,
      '...': 'xxxxxxxx' ,
      '29': '0.00'
    }

}       ## END OF MAIN OBJECT BRACKET ##

Note there are 30 columns/column names in the MySQL database for all_candidates, so each object (inside the main object) in the JSON represents a single row and/or a single candidate. There are also hundreds of rows/JSON objects in the main file, instead of the 2 that I have shown above. 

The thirty column names are named in the following array:

['CAND_ID', 'CAND_NAME', 'CAND_ICI', 
'PTY_CD', 'CAND_PTY_AFFILIATION', 
'TTL_RECEIPTS', 'TRANS_FROM_AUTH', 
'TTL_DISB', 'TRANS_TO_AUTH', 'COH_BOP', 
'COH_COP', 'CAND_CONTRIB', 'CAND_LOANS', 
'OTHER_LOANS', 'CAND_LOAN_REPAY', 
'OTHER_LOAN_REPAY', 'DEBTS_OWED_BY', 
'TTL_INDIV_CONTRIB', 'CAND_OFFICE_ST', 
'CAND_OFFICE_DISTRICT', 'SPEC_ELECTION', 
'PRIM_ELECTION', 'RUN_ELECTION', 
'GEN_ELECTION', 'GEN_ELECTION_PERCENT', 
'OTHER_POL_CMTE_CONTRIB', 'POL_PTY_CONTRIB', 
'CVG_END_DT', 'INDIV_REFUNDS','CMTE_REFUNDS']

