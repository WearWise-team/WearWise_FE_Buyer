import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function EditProductDialog({
  isOpen,
  onClose,
  onEdit,
  product,
}) {
  const [editedProduct, setEditedProduct] = useState(product);

  useEffect(() => {
    setEditedProduct(product);
  }, [product]);

  const handleEditProduct = () => {
    onEdit(editedProduct);
    onClose();
  };

  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg p-6 bg-white text-gray-800 rounded-lg shadow-lg">
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
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-price">Price</Label>
              <Input
                id="edit-price"
                type="text"
                value={`${editedProduct?.price || 0 } VND `}
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
              <Input
                id="edit-size"
                value={editedProduct?.sizes?.map((size) => size.shirt_size || size.pant_size)
                      .join(", ")}
                onChange={(e) =>
                  setEditedProduct({
                    ...editedProduct,
                    size: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-color">Color</Label>
              <Input
                id="edit-color"
                value={editedProduct?.colors?.map((color) => color.name).join(", ")}
                onChange={(e) =>
                  setEditedProduct({
                    ...editedProduct,
                    color: e.target.value,
                  })
                }
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
