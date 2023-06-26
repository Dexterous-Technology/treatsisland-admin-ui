import { cloneDeep } from "lodash";
import ApiCalls from "../../api";
import { store } from "../../store";
import { setProducts, toggleAdminLoader } from "../../store/admin-store";
import { EventEmitter } from "../../utils/event-emitter";
import EventNames from "../../const/event-names";

/**
 * This is to maintain the product related functions
 * And redux read/write operations
 *
 * All write/update operations should update redux store first and then call the API
 */
const ProductUtils = {
  loadProducts: async () => {
    store.dispatch(toggleAdminLoader(true));
    try {
      const { data } = await ApiCalls.product.public.getAllProducts();
      if (data?.data?.allProducts?.length) {
        // Sort and store
        ProductUtils._sortAndStoreProducts(data.data.allProducts);
      }
    } catch (error) {
      console.log("ProductUtils loadProducts error", error);
      store.dispatch(setProducts([]));
    }
    store.dispatch(toggleAdminLoader(false));
  },
  addProduct: async (product) => {
    store.dispatch(toggleAdminLoader(true));
    try {
      const { data } = await ApiCalls.product.public.addProduct(product);
      const {
        adminStore: { products },
      } = store.getState();
      if (data?.data?.newProductDetails) {
        // Store to redux
        const newProducts = [...products, data.data.newProductDetails];
        // Sort and store
        ProductUtils._sortAndStoreProducts(newProducts);
      }
    } catch (error) {
      console.log("ProductUtils addProduct error", error);
    }
    store.dispatch(toggleAdminLoader(false));
  },
  openProductInEditor: (product) => {
    EventEmitter.dispatch(EventNames.adminProductEditPopup.show, product);
  },
  updateProduct: async ({ productId, product }) => {
    store.dispatch(toggleAdminLoader(true));
    try {
      const { data } = await ApiCalls.product.public.updateProduct(product);
      const {
        adminStore: { products },
      } = store.getState();
      if (data?.data?.success) {
        // Re fetch the products
        await ProductUtils.loadProducts();
      }
    } catch (error) {
      console.log("ProductUtils updateProduct error", error);
    }
    store.dispatch(toggleAdminLoader(false));
  },
  toggleProduct: async ({ isActive, productId }) => {
    // Toggle product flag in redux first and then call the API
    const {
      adminStore: { products },
    } = store.getState();
    const copyProducts = cloneDeep(products);

    const newProducts = copyProducts.map((product) => {
      if (product.ProductID === productId) {
        product.isActive = isActive;
      }
      return product;
    });
    // Sort and store
    ProductUtils._sortAndStoreProducts(newProducts);
    // Also grab the product to send as payload
    const product = copyProducts.find((product) => product.ProductID === productId);
    const copyOfProduct = cloneDeep(product);
    copyOfProduct.isActive = isActive.toString();
    try {
      await ApiCalls.product.public.updateProduct(copyOfProduct);
    } catch (error) {
      console.log("ProductUtils toggleProduct error", error);
    }
  },
  _sortAndStoreProducts: (products) => {
    // Filter out the inactive products
    products = products.filter((product) => product.isLatestVersion === "true");
    // Sort the products by ProductName
    const sortedProducts = ProductUtils._sortProducts(products);
    store.dispatch(setProducts(sortedProducts));
  },
  _sortProducts: (products) => {
    return products.sort((a, b) => {
      if (a.Product < b.Product) {
        return -1;
      }
      if (a.Product > b.Product) {
        return 1;
      }
      return 0;
    });
  },
};

export default ProductUtils;
