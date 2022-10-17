//create a class called QueryOject. This will represent the data types, column names,
//and file path for the relevant .txt file containing the row data for this table type

export class QueryObject {
    constructor(destTab, colNames, colTypes, filePath) {
        this.destTab = destTab;
        this.colNames = colNames;
        this.colTypes = colTypes;
        this.filePath = filePath;
    }
}




//create a new object using QueryObject class this new 

//object is specifically for the 'all candidates' datasheet
export const allCandidates = new QueryObject(
    'all_candidates', 
    ['CAND_ID', 'CAND_NAME', 'CAND_ICI', 'PTY_CD', 'CAND_PTY_AFFILIATION', 'TTL_RECEIPTS', 'TRANS_FROM_AUTH', 'TTL_DISB', 'TRANS_TO_AUTH', 'COH_BOP', 'COH_COP', 'CAND_CONTRIB', 'CAND_LOANS', 'OTHER_LOANS', 'CAND_LOAN_REPAY', 'OTHER_LOAN_REPAY', 'DEBTS_OWED_BY', 'TTL_INDIV_CONTRIB', 'CAND_OFFICE_ST', 'CAND_OFFICE_DISTRICT', 'SPEC_ELECTION', 'PRIM_ELECTION', 'RUN_ELECTION', 'GEN_ELECTION', 'GEN_ELECTION_PERCENT' ,'OTHER_POL_CMTE_CONTRIB', 'POL_PTY_CONTRIB', 'CVG_END_DT', 'INDIV_REFUNDS','CMTE_REFUNDS'], 
    ['string','string','string','string','string','float','float','float','float','float','float','float','float','float','float','float','float','float','string','string','string','string','string','string','float','float','float','date','float','float'],
    './raw_data/all_candidates'
    )
//object is specifically for the 'candidate-committee-linkage' datasheet
export const candidateCommitteeLink = new QueryObject(
    'candidate_committee_link', 
    ['CAND_ID',	'CAND_ELECTION_YR','FEC_ELECTION_YR','CMTE_ID','CMTE_TP','CMTE_DSGN','LINKAGE_ID'], 
    ['string','string','string','string','string','string','string'],
    './raw_data/candidate_committee_link'
    )
//object is specifically for the 'individual contributions' datasheet
export const individualContributions = new QueryObject(
    'individual_contributions', 
    ['CMTE_ID','AMNDT_IND','RPT_TP','TRANSACTION_PGI','IMAGE_NUM','TRANSACTION_TP','ENTITY_TP','NAME','CITY','STATE','ZIP_CODE','EMPLOYER','OCCUPATION','TRANSACTION_DT','TRANSACTION_AMT','OTHER_ID','TRAN_ID','FILE_NUM','MEMO_CD','MEMO_TEXT','SUB_ID'], 
    ['string','string','string','string','string','string','string','string','string','string','string','string','string','string','string','string','string','string','string','string','string'],
    './raw_data/individual_contributions/by_date'
    )

