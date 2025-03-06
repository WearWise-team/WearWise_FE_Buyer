"use client";

import { useState } from "react";
import {
  Upload,
  Button,
  Slider,
  Switch,
  Row,
  Col,
  Card,
  Typography,
} from "antd";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
import styles from "./page.module.css";
import Image from "next/image";
import { tryOnKlingAI, getKlingAIResults } from "@/apiServices/tryOnK/page";
import { useNotification } from "@/apiServices/NotificationService";

const { Text } = Typography;
const { Dragger } = Upload;

// Sample data for examples
const personExamples = [
  "https://www.newtheoryclothing.com/cdn/shop/files/1_15be3c0e-66d7-4068-a7d0-7cc5463caa16.png?v=1690888546",
  "/placeholder.svg",
  "/placeholder.svg",
  "/placeholder.svg",
  "/placeholder.svg",
  "/placeholder.svg",
  "/placeholder.svg",
  "/placeholder.svg",
  "/placeholder.svg",
  "/placeholder.svg",
  "/placeholder.svg",
  "/placeholder.svg",
];

const garmentExamples = [
  "https://timshop.timhortons.ca/cdn/shop/files/retro-logo-tshirt-back-1000px.png?v=1707853862&width=1000",
  "https://bizweb.dktcdn.net/thumb/large/100/396/594/themes/937450/assets/season_coll_1_img.png",
  "/placeholder.svg",
  "/placeholder.svg",
  "/placeholder.svg",
  "/placeholder.svg",
  "/placeholder.svg",
  "/placeholder.svg",
  "/placeholder.svg",
  "/placeholder.svg",
  "/placeholder.svg",
  "/placeholder.svg",
];

// Sample data for try-on examples
const tryOnExamples = [
  {
    person: "/placeholder.svg",
    garment: "/placeholder.svg",
    result: "/placeholder.svg",
  },
  {
    person: "/placeholder.svg",
    garment: "/placeholder.svg",
    result: "/placeholder.svg",
  },
  {
    person: "/placeholder.svg",
    garment: "/placeholder.svg",
    result: "/placeholder.svg",
  },
];

export default function Home() {
  const [personImage, setPersonImage] = useState(null);
  const [garmentImage, setGarmentImage] = useState(null);
  const [resultImage, setResultImage] = useState(null);
  const notify = useNotification();

  const handlePersonUpload = (info) => {
    const file = info.file.originFileObj; 
    console.log(file);
    if (!file) {
        console.error("No file selected");
        return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPersonImage(reader.result);
      setResultImage(null);
    };
  };

  const handleGarmentUpload = (info) => {
    const file = info.file.originFileObj; 
    if (!file) {
        console.error("No file selected");
        return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setGarmentImage(reader.result);
      setResultImage(null);
    };
  };

  async function submitTryOn() {
    let personFile = personImage;
    let garmentFile = garmentImage;

    if (!personFile || !garmentFile) {
      notify("Error", "Please upload both images!", "topRight", "error");
      return;
    }

    let personBase64 = await convertToBase64(personFile);
    let garmentBase64 = await convertToBase64(garmentFile);

    if (personBase64 && garmentBase64) {

      // console.log(garmentFile);
      // console.log("object"); pass input
      // console.log(garmentBase64); 

      // let authorization = await getJWTCode();
      // if (!authorization) {
      //     alert("Error getting JWT code");
      //     return;
      // }

      // console.log(authorization.token); pass

      // let tryOnUrl = "https://api.klingai.com/v1/images/kolors-virtual-try-on";
      // let headers = {
      //   "Content-Type": "application/json",
      //   "Authorization": `Bearer ${authorization.token}`,
      // };

      let response = await tryOnKlingAI(
        {
          human_image: personBase64,
          cloth_image: garmentBase64
        }
      );

      let result = await response.json();

      console.log(result);

      // Kiểm tra nếu API trả về lỗi
      if (result.data?.code !== 0 || !result.data?.data?.task_id) {
        alert(`Error: ${result.data.message || "Unknown error"}`);
        console.log(result.data.message);
        return;
      }

      let taskId = result.data?.data.task_id;
      console.log(result);
      console.log(taskId);
      // await checkTryOnResult(taskId, result.token);
    }
  }

  async function checkTryOnResult(taskId, token) {
      let result = await getKlingAIResults(taskId, token);

      if (result.data?.data?.task_status === "failed") {
          alert(`Error: ${result.data?.message || "Unknown failure reason"}`);
          console.log(result);
          return;
      }
    

    // Nếu sau 24 lần (2 phút) vẫn không có kết quả
    notify(
      "Request took too long",
      "Failed to get try-on result within 120 seconds.",
      "topRight",
      "error"
    );
  }

  async function convertToBase64(input) {
    return new Promise((resolve, reject) => {
        if (input instanceof File) {
            const reader = new FileReader();
            reader.onload = () => {
                const base64String = reader.result.split(",")[1]; 
                resolve(base64String);
            };
            reader.onerror = (error) => {
                console.error("Error reading file:", error);
                reject(error);
            };
            reader.readAsDataURL(input);
        } 
        else if (typeof input === "string") {
            const base64Match = input.match(/^data:image\/[a-zA-Z]+;base64,(.*)$/);
            resolve(base64Match ? base64Match[1] : input);
        } 
        else {
            reject("Invalid input type");
        }
    });
  }

  const selectPersonExample = (index) => {
    setPersonImage(personExamples[index]);
  };

  const selectGarmentExample = (index) => {
    setGarmentImage(garmentExamples[index]);
  };

  return (
    <main className={styles.main}>
      <Row gutter={16} className={styles.stepsRow}>
        <Col span={8}>
          <Card
            className={styles.card}
            title={
              <div className={styles.stepTitle}>
                Step 1. Upload a person Image{" "}
                <span className={styles.infoIcon}>ℹ️</span>
              </div>
            }
          >
            <Dragger
              name="personImage"
              showUploadList={false}
              onChange={handlePersonUpload}
              customRequest={({ onSuccess }) => {
                setTimeout(() => {
                  onSuccess("ok");
                }, 0);
              }}
              className={styles.uploader}
            >
              {personImage ? (
                <Image 
                  width={200}
                  height={300}
                  src={personImage || "/placeholder.svg"}
                  alt="Person"
                  className={`${styles.uploadedImage}`}
                />
              ) : (
                <div className={styles.uploadContent}>
                  <p className="ant-upload-drag-icon">
                    <UploadOutlined />
                  </p>
                  <p className={styles.uploadText}>Drop Image Here</p>
                  <p className={styles.uploadOr}>or</p>
                  <p className={styles.uploadClick}>Click to Upload</p>
                </div>
              )}
            </Dragger>

            <div className={styles.examplesSection}>
              <Text className={styles.examplesTitle}>Examples</Text>
              <div className={styles.examplesGrid}>
                {personExamples.map((example, index) => (
                  <div
                    key={`person-${index}`}
                    className={styles.exampleItem}
                    onClick={() => selectPersonExample(index)}
                  >
                    <img
                      src={example || "/placeholder.svg"}
                      alt={`Person example ${index}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </Col>

        <Col span={8}>
          <Card
            className={styles.card}
            title={
              <div className={styles.stepTitle}>
                Step 2. Upload a garment image{" "}
                <span className={styles.infoIcon}>ℹ️</span>
              </div>
            }
          >
            <Dragger
              name="garmentImage"
              showUploadList={false}
              onChange={handleGarmentUpload}
              customRequest={({ onSuccess }) => {
                setTimeout(() => {
                  onSuccess("ok");
                }, 0);
              }}
              className={styles.uploader}
            >
              {garmentImage ? (
                <Image 
                  width={200}
                  height={300}
                  src={garmentImage || "/placeholder.svg"}
                  alt="Garment"
                  className={styles.uploadedImage}
                />
              ) : (
                <div className={styles.uploadContent}>
                  <p className="ant-upload-drag-icon">
                    <UploadOutlined />
                  </p>
                  <p className={styles.uploadText}>Drop Image Here</p>
                  <p className={styles.uploadOr}>or</p>
                  <p className={styles.uploadClick}>Click to Upload</p>
                </div>
              )}
            </Dragger>

            <div className={styles.examplesSection}>
              <Text className={styles.examplesTitle}>Examples</Text>
              <div className={styles.examplesGrid}>
                {garmentExamples.map((example, index) => (
                  <div
                    key={`garment-${index}`}
                    className={styles.exampleItem}
                    onClick={() => selectGarmentExample(index)}
                  >
                    <img
                      src={example || "/placeholder.svg"}
                      alt={`Garment example ${index}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </Col>

        <Col span={8}>
          <Card
            className={styles.card}
            title={
              <div className={styles.stepTitle}>
                Step 3. Press "Run" to get try-on results
              </div>
            }
          >
            <div className={styles.resultContainer}>
              {resultImage ? (
                <img
                  src={resultImage || "/placeholder.svg"}
                  alt="Result"
                  className={styles.resultImage}
                />
              ) : (
                <div className={styles.emptyResult}>
                  <InboxOutlined style={{ fontSize: 48 }} />
                </div>
              )}
            </div>

            <Card className={styles.seedCard}>
              <div className={styles.runButtonContainer}>
                <Button
                  type="primary"
                  onClick={() => submitTryOn()}
                  className={styles.runButton}
                  disabled={!personImage || !garmentImage}
                >
                  Run
                </Button>
              </div>
            </Card>
          </Card>
        </Col>
      </Row>

      <div className={styles.tryOnExamplesSection}>
        <Text className={styles.tryOnExamplesTitle}>
          Virtual try-on examples in pairs of person and garment images
        </Text>

        <div className={styles.tryOnExamplesTable}>
          <div className={styles.tryOnExamplesHeader}>
            <div className={styles.tryOnHeaderCell}>Person Image</div>
            <div className={styles.tryOnHeaderCell}>Garment Image</div>
            <div className={styles.tryOnHeaderCell}>Result</div>
          </div>

          {tryOnExamples.map((example, index) => (
            <div key={`tryOn-${index}`} className={styles.tryOnExampleRow}>
              <div className={styles.tryOnCell}>
                <img
                  src={example.person || "/placeholder.svg"}
                  alt={`Person ${index}`}
                />
              </div>
              <div className={styles.tryOnCell}>
                <img
                  src={example.garment || "/placeholder.svg"}
                  alt={`Garment ${index}`}
                />
              </div>
              <div className={styles.tryOnCell}>
                <img
                  src={example.result || "/placeholder.svg"}
                  alt={`Result ${index}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}