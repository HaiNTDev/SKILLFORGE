function formatCurrency(number) {
  // Định dạng số tiền
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  // Trả về số tiền đã được định dạng kèm theo ký tự "₫"
  return formatter.format(number);
}
export default formatCurrency;
