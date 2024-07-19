const mongoose = require("mongoose");

const varianSchema = new mongoose.Schema({
  _id: false,
  nama_varian: {
    type: String,
  },
  nilai_varian: [
    {
      _id: false,
      nama: {
        type: String,
      },
      harga: {
        type: Number,
      },
    },
  ],
});

const productModels = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => `Prod-${new mongoose.Types.ObjectId().toString()}`,
    },
    bervarian: {
      type: Boolean,
      default: false,
    },
    name_product: {
      type: String,
      maxlength: [250, "panjang nama harus antara 5 - 250 karakter"],
      minlength: [5, "panjang nama harus antara 5 - 250 karakter"],
      required: [true, "name_product harus di isi"],
    },
    price: {
      type: Number,
      required: [true, "price harus di isi"],
      min: [100, "price yang harus diisi setidaknya 100"],
    },
    total_price: {
      type: Number,
      required: false,
    },
    diskon: {
      type: Number,
      required: false,
      validate: {
        validator: (value) => {
          if (value > 100) return false;
        },
        message: (props) =>
          `Diskon tidak bisa melebihi 100%. Diskon yang dimasukan ${props.value}%`,
      },
    },
    description: {
      type: String,
    },
    long_description: {
      type: String,
      required: [true, "deskripsi harus diisi"],
    },
    minimalDp: {
      type: Number,
      min: 40,
    },
    image_product: {
      type: [String],
      required: [true, "product harus memiliki setidaknya 1 gambar"],
    },
    varian: {
      type: [varianSchema],
      default: () => null,
      maxlength: [2, "hanya bisa 2 jenis varian"],
    },
    status: {
      value: {
        type: String,
        enum: ["ditinjau", "terpublish", "ditolak", "diblokir", "diarsipkan"],
        message: "{VALUE} is not supported",
        default: "ditinjau",
      },
      message: {
        type: String,
        default: "Produk kamu sedang dalam proses tinjauan superapp. Produk kamu akan segera terunggah setelah tinjauan selesai.",
      },
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    id_main_category: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "MainCategory",
    },
    id_sub_category: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "SubCategory",
    },
    categoryId: {
      type: mongoose.Types.ObjectId,
      required: false,
      ref: "SpecificCategory",
    },
    total_stok: {
      type: Number,
      required: true,
      default: 0,
    },
    pemasok: {
      type: mongoose.Types.ObjectId,
      ref: "Supplier",
      default: null,
    },
    rating: {
      type: Number,
      default: 0,
    },
    minimalOrder: {
      type: Number,
    },
    isFlashSale: {
      type: Boolean,
      default: false,
    },
    panjang: {
      type: Number,
      required: true,
    },
    lebar: {
      type: Number,
      required: true,
    },
    tinggi: {
      type: Number,
      required: true,
    },
    berat: {
      type: Number,
      required: true,
    },
    isReviewed: {
      type: Boolean,
      default: false
    },
    pangan: [{
      type: {
        _id: false,
        panganId: {
          type: mongoose.Types.ObjectId,
          ref: "Pangan"
        },
        berat: {
          type: Number
        },
      },
      required: true,
      min: 1
    }],
    poin_review: {
      type: Number,
      default: 0
    },
    reviews: [{ // Menambahkan array referensi ulasan
      type: mongoose.Types.ObjectId,
      ref: "ReviewProduk"
    }]
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productModels);

module.exports = Product;
