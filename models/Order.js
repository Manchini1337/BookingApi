import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
  {
    product: {
      type: String,
      required: true,
    },
    customer: {
      type: String,
      required: true,
    },
    bookedDates: {
      type: [Date],
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Order', OrderSchema);
