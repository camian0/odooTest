/** @odoo-module **/
// import { OrderSummary } from "@point_of_sale/app/screens/product_screen/order_summary/order_summary";
import { OrderWidget } from "@point_of_sale/app/generic_components/order_widget/order_widget";
import { patch } from "@web/core/utils/patch";
import { onPatched } from "@odoo/owl";

patch(OrderWidget.prototype, {
  setup() {
    super.setup();
    this.oldLinesLength = 0
    this.currentLinesLength = this.props.lines.length;

    // check lisr products
    onPatched(() => {
      this.currentLinesLength = this.props.lines.length || 0;

      if (this.oldLinesLength !== this.currentLinesLength) {
        console.log("Productos cambiaron:", this.oldLinesLength, "→", this.currentLinesLength);
        this.oldLinesLength = this.currentLinesLength;
        this.recalculateDiscount();
      }
    });


  },

  recalculateDiscount() {
    console.log("productos", this.props.lines);
    // let newOrderLines = []
    if (this.props && this.props.lines.length > 0) {
      console.log("hay productos en la orden")
      // let discount = this.searchProductDiscount(this.props.lines)
      // if (discount) {
      //   let oldTotal = this.props.taxTotals.total_amount
      //   // this.props.taxTotals = this.props.taxTotals * 1
      //   // let newTotal = oldTotal - discount.price_unit;
      //   console.log("total antes: ", oldTotal)
      //   console.log("total despues: ", newTotal)
      //   this.props.taxTotals.order_total = oldTotal

      //   // newTotal = this.roundMoneyWithThreshold(newTotal);
      //   // console.log("nuevo total con redondeo: ", newTotal)
      //   // console.log("nuevo total: ", newTotal)
      //   // console.log("descuento: ", discount)
      //   // this.order.amount_total = this.order.amount_total - newTotal;
      //   // newOrderLines = this.order.lines.map((item) => {
      //   //   let discount=0
      //   //   let discountProduct = item.

      //   //   return item;
      //   // })
      // }
    }

  },

  searchProductDiscount(products) {
    if (products) {
      for (let product of products) {
        let productName = product.full_product_name.toUpperCase().trim();
        console.log("nombre producto: ", productName)
        if (productName === "DISCOUNT") {
          product.price_unit = product.price_unit * -1
          product.price_subtotal = product.price_subtotal * -1
          product.price_subtotal_incl = product.price_subtotal_incl * -1
          console.log("producto cambiado: ", product)
          return product;
        }
      }
      return undefined;
    }
  },

  roundMoneyWithThreshold(quantity, decimals = 2, threshold = 0.5) {
    const factor = Math.pow(10, decimals);
    const number = quantity * factor;
    const integer = Math.floor(number);
    const decimal = number - integer;

    console.log("factor", factor)
    console.log("number", number)
    console.log("integer", integer)
    console.log("decimal", decimal)

    return decimal >= threshold ?
      Math.ceil(number) / factor :
      Math.floor(number) / factor;
  }


});
