"use client";

import { useState } from "react";
import Head from "next/head";
import { InputField } from "@/components/InputField"; // Điều chỉnh đường dẫn cho đúng
import Link from "next/link";
import { IoMdArrowDropright } from "react-icons/io";

export default function ShippingAddressPage() {
  // Danh sách địa chỉ mẫu ban đầu
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Join Kevin",
      phone: "0976543456",
      address: "101B Le Huu Trac - Phuoc My - Son Tra - Da Nang",
    },
    {
      id: 2,
      name: "Nguyen hai",
      phone: "0976543456",
      address: "101B Le Huu Trac - Phuoc My - Son Tra - Da Nang",
    },
  ]);

  // Quản lý trạng thái hiển thị modal (edit, delete, add)
  const [activeForm, setActiveForm] = useState(null); // "edit", "delete", "add" hoặc null
  const [selectedAddress, setSelectedAddress] = useState(null);

  // State cho form chỉnh sửa
  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editAddress, setEditAddress] = useState("");

  // State cho form thêm mới
  const [addName, setAddName] = useState("");
  const [addPhone, setAddPhone] = useState("");
  const [addAddress, setAddAddress] = useState("");

  // Hiển thị form chỉnh sửa và nạp dữ liệu của địa chỉ cần chỉnh sửa
  const showEditForm = (addressId) => {
    const addr = addresses.find((a) => a.id === addressId);
    if (addr) {
      setSelectedAddress(addr);
      setEditName(addr.name);
      setEditPhone(addr.phone);
      setEditAddress(addr.address);
      setActiveForm("edit");
    }
  };

  // Hiển thị form xóa địa chỉ
  const showDeleteForm = (addressId) => {
    const addr = addresses.find((a) => a.id === addressId);
    if (addr) {
      setSelectedAddress(addr);
      setActiveForm("delete");
    }
  };

  // Hiển thị form thêm mới địa chỉ
  const showAddForm = () => {
    setAddName("");
    setAddPhone("");
    setAddAddress("");
    setActiveForm("add");
  };

  const closeForm = () => {
    setActiveForm(null);
    setSelectedAddress(null);
  };

  // Xử lý submit cho form chỉnh sửa
  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (selectedAddress) {
      setAddresses(
        addresses.map((a) =>
          a.id === selectedAddress.id
            ? { ...a, name: editName, phone: editPhone, address: editAddress }
            : a
        )
      );
      closeForm();
    }
  };

  // Xử lý submit cho form xóa địa chỉ
  const handleDeleteSubmit = (e) => {
    e.preventDefault();
    if (selectedAddress) {
      setAddresses(addresses.filter((a) => a.id !== selectedAddress.id));
      closeForm();
    }
  };

  // Xử lý submit cho form thêm địa chỉ mới
  const handleAddSubmit = (e) => {
    e.preventDefault();
    const newId =
      addresses.length > 0 ? Math.max(...addresses.map((a) => a.id)) + 1 : 1;
    const newAddress = {
      id: newId,
      name: addName,
      phone: addPhone,
      address: addAddress,
    };
    setAddresses([...addresses, newAddress]);
    closeForm();
  };

  return (
    <>
      <div className="container mx-auto p-4">
        {/* Breadcrumb */}
        <nav className="text-sm mb-4 flex gap-2 text-end">
          <Link className="text-gray-500 hover:text-gray-700" href="#">
            Home
          </Link>{" "}
          <IoMdArrowDropright className="pt-1 h-full" />
          <Link className="text-gray-500 hover:text-gray-700" href="#">
            Cart
          </Link>{" "}
          <IoMdArrowDropright className="pt-1 h-full" />
          <Link className="text-gray-500 hover:text-gray-700" href="#">
            process to checkout (Shipping Address)
          </Link>{" "}
        </nav>

        {/* Title */}
        <h1 className="text-3xl font-bold mb-4">Shipping Address</h1>

        {/* Subtitle */}
        <h2 className="text-lg font-semibold mb-2">
          Select a delivery address
        </h2>
        <p className="text-gray-500 mb-6">
          Is the address you&apos;d like to use displayed below? If so, click
          the corresponding &quot;Deliver to this address&quot; button. Or you
          can enter a new delivery address.
        </p>

        {/* Address List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {addresses.map((address) => (
            <div key={address.id} className="border p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="font-semibold">{address.name}</p>
                  <p className="text-gray-600">{address.phone}</p>
                </div>
                <input
                  type="radio"
                  name="address"
                  className="form-radio h-5 w-5 text-black"
                />
              </div>
              <p className="text-gray-600 mb-4">{address.address}</p>
              <div className="flex space-x-2">
                <button
                  onClick={() => showEditForm(address.id)}
                  className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
                >
                  <i className="fas fa-edit mr-2"></i> Edit
                </button>
                <button
                  onClick={() => showDeleteForm(address.id)}
                  className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg"
                >
                  <i className="fas fa-trash-alt mr-2"></i> Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <button
            onClick={showAddForm}
            className="px-6 py-2 bg-black text-white rounded-full"
          >
            Add new address
          </button>
          <button className="px-6 py-2 bg-black text-white rounded-full">
            Next
          </button>
        </div>
      </div>

      {/* Modal Edit Address */}
      {activeForm === "edit" && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Edit Address</h2>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <InputField
                  label="Name"
                  type="text"
                  id="editName"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <InputField
                  label="Phone"
                  type="text"
                  id="editPhone"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <InputField
                  label="Address"
                  type="text"
                  id="editAddress"
                  value={editAddress}
                  onChange={(e) => setEditAddress(e.target.value)}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={closeForm}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Delete Confirmation */}
      {activeForm === "delete" && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Delete Address</h2>
            <p className="mb-4">
              Are you sure you want to delete this address?
            </p>
            <form onSubmit={handleDeleteSubmit}>
              {/* Ẩn input chứa id, không cần dùng InputField */}
              <input
                type="hidden"
                id="deleteAddressId"
                value={selectedAddress ? selectedAddress.id : ""}
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={closeForm}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-500 text-white rounded-lg"
                >
                  Delete
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Add New Address */}
      {activeForm === "add" && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Add New Address</h2>
            <form onSubmit={handleAddSubmit}>
              <div className="mb-4">
                <InputField
                  label="Name"
                  type="text"
                  id="addName"
                  value={addName}
                  onChange={(e) => setAddName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <InputField
                  label="Phone"
                  type="text"
                  id="addPhone"
                  value={addPhone}
                  onChange={(e) => setAddPhone(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <InputField
                  label="Address"
                  type="text"
                  id="addAddress"
                  value={addAddress}
                  onChange={(e) => setAddAddress(e.target.value)}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={closeForm}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
