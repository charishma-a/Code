export const getArrayFieldNamePrefix = ({
  collection,
  collectionName,
  fieldName,
  fieldValue,
}: {
  collection: any[]
  collectionName: string
  fieldName: string
  fieldValue: string
}): string => {
  const index = collection.findIndex((item) => item[fieldName] === fieldValue)
  return `${collectionName}[${index}]`
}
