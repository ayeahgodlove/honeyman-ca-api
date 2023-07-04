import { ProductImage } from "../../entities/product-image";
import { IProductImageRepository } from "../contracts/iproduct-image.repository";
import { IProductImage } from "../../../domain/models/product-image";
import { NotFoundException } from "../../../shared/exceptions/not-found.exception";

export class ProductImageRepository implements IProductImageRepository {
  /**
   *
   */
  constructor() {}

  /**
   * Receives a ProductImage as parameter
   * @productImage
   * returns void
   */
  async create(productImage: IProductImage): Promise<ProductImage> {
    try {
      return await ProductImage.create<ProductImage>(productImage as any);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a String as parameter
   * @id
   * returns ProductImage
   */
  async findById(id: string): Promise<ProductImage | null> {
    try {
      const productImageItem = await ProductImage.findByPk(id);
            
      if (!productImageItem) {
        throw new NotFoundException("Product Image", id.toString());
      }
      return productImageItem;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a String as parameter
   * @name
   * returns ProductImage
   */
  async findByName(name: string): Promise<ProductImage | null> {
    try {
      const productImageItem = await ProductImage.findOne({ where: { name } });
      return productImageItem;
    } catch (error) {
      throw error;
    }
  }

  /*
   * Returns an array of ProductImage
   */
  async getAll(): Promise<ProductImage[]> {
    try {
      const categories = await ProductImage.findAll();
      return categories;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a ProductImage as parameter
   * @productImage
   * returns void
   */
  async update(productImage: IProductImage): Promise<ProductImage> {
    const { id } =
      productImage;
    try {
      const productImageItem: any = await ProductImage.findByPk(id);
      
      if (!productImageItem) {
        throw new NotFoundException("Product Image", id.toString());
      }

      return await productImageItem?.update(productImage);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a string as parameter
   * @id
   * returns void
   */
  async delete(id: string): Promise<void> {
    try {
      const productImageItem = await ProductImage.findByPk(id);
      if (!productImageItem) {
        throw new NotFoundException("Product Image", id);
      }
      await productImageItem?.destroy({
        force: true,
      });
    } catch (error) {
      throw error;
    }
  }
}
