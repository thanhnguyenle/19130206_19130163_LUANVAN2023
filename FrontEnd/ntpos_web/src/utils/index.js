export const formatDate = (date) => {
  return date.toLocaleDateString()
}
export function formatIDR(amount) {
  const idFormatter = new Intl.NumberFormat('id-ID')
  return idFormatter.format(amount)
}

export function genInvId() {
  const currentDate = new Date()
  return `INV/${currentDate.getDate()}/${currentDate.getMonth()}/${currentDate.getFullYear()}`
};
//
export function formatID(id) {
  const maxLength = 5; // Độ dài tối đa của ID rút gọn
  if (id.length <= maxLength) {
    return id; // Trả về ID nguyên gốc nếu độ dài không vượt quá maxLength
  } else {
    const truncatedID = id.slice(0, maxLength); // Cắt bỏ phần dư sau maxLength
    return truncatedID;
  }
}