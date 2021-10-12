import React from "react";
import ProductInfo from "../../components/ProductInfo";
import ProductService from "../../services/ProductService";
import ProductHelper from "../../tools/ProductHelper";
import SessionStorageHelper from "../../tools/SessionStorageHelper";
import Product from "../../types/Product";
import Sku from "../../types/Sku";

interface ProductState {
    product: Product;
    helper: ProductHelper;
    colors: string[];
    selectedColor: string;
    sizes: string[];
    selectedSize: string;
    selectedQuantity: number;
    sku: Sku;
}

/**
 * Product Detail Container
 * @extends {Component<Props, State>}
 */
class ProductDetail extends React.Component<{}, ProductState> {
    state = {
        product: {} as Product,
        helper: {} as ProductHelper,
        colors: [] as string[],
        selectedColor: '',
        sizes: [] as string[],
        selectedSize: '',
        selectedQuantity: 1,
        sku: {} as Sku
    }

    /**
     * Renders the container.
     * @return {any} - HTML markup for the container
     */
    render() {
        return (
            <ProductInfo product={this.state.product} colors={this.state.colors} selectedColor={this.state.selectedColor} changedColor={this.changedColor}
                sizes={this.state.sizes} selectedSize={this.state.selectedSize} changedSize={this.changedSize} addToCart={this.addToCart} selectedQuantity={this.state.selectedQuantity} changedQuantity={this.changedQuantity} />
        )
    }

    componentDidMount() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const productId = Number(urlParams.get('productId'));

        ProductService.get(productId)
            .then(response => {
                const product = response.data;
                console.log(product);
                const helper = new ProductHelper(product);
                const colors = helper.getColors();
                let sizes = [] as string[];

                if (colors.length >= 1) {
                    const defaultSelectedColor = colors[0];
                    sizes = helper.getSizes(colors[0]);

                    this.setState({ selectedColor: defaultSelectedColor });

                    if (sizes.length >= 1) {
                        const defaultSelectedSize = sizes[0];
                        this.setState({ selectedSize: defaultSelectedSize });
                        const sku = helper.getSku(defaultSelectedColor, defaultSelectedSize);
                        this.setState({ sku });
                    }
                }

                console.log("Sizes: " + sizes);

                this.setState({ product, helper, colors, sizes });
            }).catch(error => {
                console.log(error);
            });
    }

    changedColor = (event: any) => {
        let target = event.currentTarget as HTMLSelectElement;
        let value = target.value;

        console.log("selectedColor: " + value);

        const helper = this.state.helper;
        const sizes = helper.getSizes(value);

        this.setState({
            selectedColor: value,
            sizes
        })

        if (sizes.length >= 1) {
            const defaultSelectedSize = sizes[0];
            const sku = this.state.helper.getSku(value, defaultSelectedSize);
            this.setState({ selectedSize: defaultSelectedSize, sku });
            this.setState({ selectedSize: defaultSelectedSize });
        }
    }

    changedSize = (event: any) => {
        let target = event.currentTarget as HTMLSelectElement;
        let value = target.value;

        console.log("selectedSize: " + value);
        const sku = this.state.helper.getSku(this.state.selectedColor, value);
        console.log("Selected sku: " + sku.id);
        this.setState({
            selectedSize: value,
            sku
        })
    }

    changedQuantity = (event: any) => {
        let target = event.currentTarget as HTMLSelectElement;
        let value = target.value;

        this.setState({
            selectedQuantity: parseInt(value)
        })
    }

    addToCart = (event: any) => {
        console.log("Add to Cart sku id: " + this.state.sku.id);
        const cart = SessionStorageHelper.getCart();
        cart.addItem(this.state.product, this.state.sku, this.state.selectedQuantity, this.state.sku.salePrice);
        SessionStorageHelper.updateCart(cart);
    }
}

export default ProductDetail;