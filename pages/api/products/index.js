import { db, SHOP_CONSTANTS } from "../../../database";
import { IProduct } from "../../../interfaces";
import { Product } from "../../../models";

// type Data =
//   | {
//       message: string;
//     }
//   | IProduct;

export default function (req, res) {
  switch (req.method) {
    case "GET":
      return getProducts(req, res);

    default:
      return res.status(400).json({
        message: "Bad request",
      });
  }
}

const getProductBySlug = async (req, res) => {
  const { slug } = req.query;

  await db.connect();

  const product = await Product.findById(slug);

  console.log(product);

  await db.disconnect();

  return res.status(200).json({ product });
};

const getProducts = async (req, res) => {
  const { gender = "all" } = req.query;

  let condition;

  if (gender !== "all" && SHOP_CONSTANTS.validGenders.includes(`${gender}`)) {
    condition = { gender };
  }

  await db.connect();

  const products = await Product.find(condition)
    .select("title images price inStock slug")
    .lean();

  await db.disconnect();

  return res.status(200).json(products);
};
