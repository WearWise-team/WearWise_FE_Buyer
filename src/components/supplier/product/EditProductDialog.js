import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
// import { useNotification } from "@/apiServices/NotificationService";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getSizes } from "@/apiServices/size/page";
import { getColors } from "@/apiServices/colors/page";
import { getDiscounts } from "@/apiServices/discounts/page";
import { MultiSelect } from "@/components/ui/multi-select";
import { X } from "lucide-react";
// import { getSupplierByUserID } from "@/apiServices/suppliers/page";

export default function EditProductDialog({
  isOpen,
  onClose,
  onEdit,
  product,
}) {
  const [editedProduct, setEditedProduct] = useState(product);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  // const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  // const notify = useNotification();
  // const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchSizes = async () => {
      try {
        const sizes = await getSizes();
        setSizes(sizes);
      } catch (error) {
        console.error("Fetch sizes error:", error);
      }
    };
    fetchSizes();
  }, []);

  useEffect(() => {
    const fetchColors = async () => {
      try {
        const response = await getColors();
        setColors(response.data);
      } catch (error) {
        console.error("Fetch colors error:", error);
      }
    };
    fetchColors();
  }, []);

  useEffect(() => {
    const fetchDiscount = async () => {
      try {
        const discounts = await getDiscounts();
        setDiscounts(discounts);
      } catch (error) {
        console.error("Fetch colors error:", error);
      }
    };
    fetchDiscount();
  }, []);

  // useEffect(() => {
  //   const fetchSupplier = async () => {
  //     const userData = localStorage.getItem("user");
  //     if (!userData) return;

  //     try {
  //       const user = JSON.parse(userData);
  //       const supplier = await getSupplierByUserID(user.id);
  //       setFormData((prev) => ({
  //         ...prev,
  //         supplier_id: supplier.id,
  //       }));
  //     } catch (error) {
  //       console.error("Fetch supplier error:", error);
  //     }
  //   };
  //   fetchSupplier();
  // }, []);

  useEffect(() => {
    setEditedProduct(product);
  }, [product]);

  const handleEditProduct = () => {
    onEdit(editedProduct);
    onClose();
  };
  const selectedDiscounts = editedProduct?.discounts?.map((discount) => ({
    value: discount.id,
    label: `${discount.code} - ${Math.round(discount.percentage)}%`,
  }));

  const selectedSizes = editedProduct?.sizes?.map((size) => ({
    value: size.id,
    label: size.name,
  }));

  const selectedColors = editedProduct?.colors?.map((color) => ({
    value: color.id,
    label: color.name,
  }));
  const handleImageChange = (e, type) => {
    if (!e) {
      setEditedProduct((prev) => ({
        ...prev,
        main_image: null,
      }));
      return;
    }

    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedProduct((prev) => ({
          ...prev,
          main_image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveSubImage = (index) => {
    setEditedProduct((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const readers = files.map((file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(file);
        });
      });

      Promise.all(readers).then((newImages) => {
        setEditedProduct((prev) => ({
          ...prev,
          images: [...(prev.images || []), ...newImages],
        }));
      });
    }
  };

  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl w-full h-auto max-h-[90vh] overflow-y-auto p-6 bg-white text-gray-800 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-xl">Edit Product</DialogTitle>
          <DialogDescription className="text-gray-500">
            Update the product details below.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="edit-name">Product Name</Label>
            <Input
              id="edit-name"
              value={editedProduct?.name}
              onChange={(e) =>
                setEditedProduct({
                  ...editedProduct,
                  name: e.target.value,
                })
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-category">Category</Label>
              <Input
                id="edit-category"
                value={editedProduct?.category}
                onChange={(e) =>
                  setEditedProduct({
                    ...editedProduct,
                    category: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-discount">Discount</Label>
              <MultiSelect
                id="edit-discount"
                options={discounts.map((discount) => ({
                  label: `${discount.code} - ${Math.round(
                    discount.percentage
                  )}%`,
                  value: discount.id,
                }))}
                value={selectedDiscounts}
                // onChange={(values) =>
                //   setFormData({ ...formData, discounts: values })
                // }
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-price">Price</Label>
              <Input
                id="edit-price"
                type="text"
                value={editedProduct?.price || 0}
                onChange={(e) =>
                  setEditedProduct({
                    ...editedProduct,
                    price: Number(e.target.value),
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-quantity">Quantity</Label>
              <Input
                id="edit-quantity"
                type="number"
                value={editedProduct?.quantity}
                onChange={(e) =>
                  setEditedProduct({
                    ...editedProduct,
                    stock: Number(e.target.value),
                  })
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-size">Size</Label>
              <MultiSelect
                id="edit-size"
                options={sizes.map((size) => ({
                  label: size.name,
                  value: size.id,
                }))}
                value={selectedSizes}
                // onChange={(values) =>
                //   setFormData({ ...formData, discounts: values })
                // }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-color">Color</Label>
              <MultiSelect
                id="edit-color"
                options={colors.map((color) => ({
                  label: color.name,
                  value: color.id,
                }))}
                value={selectedColors}
                // onChange={(values) =>
                //   setFormData({ ...formData, discounts: values })
                // }
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-description">Description</Label>
            <Textarea
              id="edit-description"
              value={editedProduct?.description}
              onChange={(e) =>
                setEditedProduct({
                  ...editedProduct,
                  description: e.target.value,
                })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Main Image</Label>
            {editedProduct?.main_image ? (
              <div className="relative w-fit">
                <img
                  src={editedProduct.main_image}
                  alt="Main"
                  className="max-h-48 object-contain rounded-lg shadow-md"
                />
                <button
                  onClick={() => handleImageChange(null, "mainImage")}
                  className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-200"
                >
                  <X className="w-6 h-6 text-red-500" size={16} />
                </button>
              </div>
            ) : (
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, "mainImage")}
              />
            )}
          </div>
          <div className="space-y-2">
            <Label>Additional Images</Label>
            <div className="flex gap-2 flex-wrap">
              {editedProduct?.images?.map((img, index) => (
                <div key={index} className="relative w-20 h-20">
                  <img
                    src={img.url}
                    alt="Sub"
                    className="w-20 h-20 object-cover rounded-lg border"
                  />
                  <button
                    onClick={() => handleRemoveSubImage(index)}
                    className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-200"
                  >
                    <X className="w-5 h-5 text-red-500" />
                  </button>
                </div>
              ))}
            </div>

            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={handleSubImageChange}
            />
          </div>
        </div>
        <DialogFooter className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleEditProduct}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
