import "./index.css";
import Product from "../../types/Product";
import {
  Grid,
  Paper,
  Typography,
  InputLabel,
  Select,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@material-ui/core";
import React from "react";

interface ProductInfoProps {
  product: Product;
  colors: string[];
  sizes: string[];
  selectedColor: string;
  changedColor(event: any): void;
  selectedSize: string;
  changedSize(event: any): void;
  selectedQuantity: number;
  changedQuantity(event: any): void;  
  addToCart(event: any): void;
}

/**
 * Product info elements
 * @returns ProductInfo UI elements
 */
const ProductInfo : React.FC<ProductInfoProps>  = (props) => {
  var listPrice = 0.00;
  if (props.product !== undefined && props.product.childSkus !== undefined && props.product.childSkus[0] !== undefined) {
    listPrice = props.product.childSkus[0].listPrice;
  }

  var salePrice = 0.00;
  if (props.product !== undefined && props.product.childSkus !== undefined && props.product.childSkus[0] !== undefined) {
    salePrice = props.product.childSkus[0].salePrice;
  }

  var colors : any[] = [];
  var sizes : any[] = [];
  var comments: any[] = [];

  props.colors.forEach( (color) => {
    colors.push(<option value={color}>{color}</option>);
  }); 

  props.sizes.forEach( (size) => {
    sizes.push(<option value={size}>{size}</option>);
  }); 

  if (props.product !== undefined && props.product.childSkus !== undefined) {
    props.product.comments.forEach( (comment) => {
      comments.push(
        <React.Fragment>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={comment.author}
                secondary={
                  <React.Fragment>
                    <Typography>
                      {comment.body}
                    </Typography>
                    {comment.created}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
      );
    });  
  }

  var largeImageUrl = "";
  if (props.product !== undefined && props.product.childSkus !== undefined && props.product.childSkus[0] !== undefined) {
    largeImageUrl = props.product.childSkus[0].largeImageUrl;
  }

  return (
    <div className="productInfo">
      <Grid container className="productGrid" spacing={2}>
        <Grid item lg={4}>
          <Paper className="largeImage">
            <img
              src={largeImageUrl}
              alt={props.product.name}
            />
          </Paper>
        </Grid>

        <Grid item lg={8} container>
          <Grid item lg={12}>
            <Typography className="productName" variant="h1">
              {props.product.name}
            </Typography>
          </Grid>
          <Grid item lg={12}>
            <Typography>
              {props.product.description}
            </Typography>
          </Grid>
          <Grid item lg={2}>
            <Typography className="dollars crossedout">{listPrice}</Typography>
          </Grid>
          <Grid item lg={2}>
            <Typography className="dollars">{salePrice}</Typography>
          </Grid>
          <Grid item lg={8} />
          <Grid item lg={2}>
            <InputLabel className="productLabel" id="color-label">
              Color
            </InputLabel>
            <Select labelId="color-label" id="color-select" native={true} label="Color" value={props.selectedColor} onChange={props.changedColor}>
              {colors}
            </Select>
          </Grid>
          <Grid item lg={2}>
            <InputLabel className="productLabel" id="size-label">
              Size
            </InputLabel>
            <Select labelId="size-label" id="size-select" native={true} label="Size" value={props.selectedSize} onChange={props.changedSize}>
              {sizes}
            </Select>
          </Grid>
          <Grid item lg={8} />
          <Grid item lg={2}>
            <InputLabel className="productLabel" id="quantity-label">
              Quantity
            </InputLabel>
            <Select labelId="quantity-label" id="quantity-select" native={true} label="Quantity" value={props.selectedQuantity} onChange={props.changedQuantity}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </Select>
          </Grid>
          <Grid item lg={10} />

          <Grid item lg={4}>
            <Button className="cartButton" variant="contained" onClick={props.addToCart}>
              Add to Cart
            </Button>
          </Grid>

          <Grid item lg={12} />
        </Grid>
      </Grid>
      <Grid container className="commentGrid" spacing={2}>
        <Grid item lg={4}>
          <Typography variant="h2" className="comment-title">Comments</Typography>
        </Grid>
        <Grid item lg={8} />
        <Grid item lg={12}>
          <List>
            {comments}
          </List>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductInfo;