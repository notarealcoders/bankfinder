export function transformBankData(data) {
  if (!data) return null;

  // Handle single document
  if (!Array.isArray(data)) {
    return transformSingleBankData(data);
  }

  // Handle array of documents
  return data.map(transformSingleBankData);
}

function transformSingleBankData(doc) {
  // Handle MongoDB ObjectId
  const id = doc._id?.$oid || doc._id?.toString() || doc._id;

  // Transform the document
  return {
    id,
    BANK: doc.BANK || "",
    IFSC: doc.IFSC || "",
    BRANCH: doc.BRANCH || "",
    ADDRESS: doc.ADDRESS || "",
    CITY1: doc.CITY1 || "",
    CITY2: doc.CITY2 || "",
    STATE: doc.STATE || "",
    STD_CODE: doc.STD_CODE?.$numberInt || doc.STD_CODE || "",
    PHONE: doc.PHONE?.$numberInt || doc.PHONE || "",
  };
}
