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

const { Title, Text } = Typography;
const { Dragger } = Upload;

// Sample data for examples
const personExamples = [
  "https://www.newtheoryclothing.com/cdn/shop/files/1_15be3c0e-66d7-4068-a7d0-7cc5463caa16.png?v=1690888546?height=100&width=80",
  "/placeholder.svg?height=100&width=80",
  "/placeholder.svg?height=100&width=80",
  "/placeholder.svg?height=100&width=80",
  "/placeholder.svg?height=100&width=80",
  "/placeholder.svg?height=100&width=80",
  "/placeholder.svg?height=100&width=80",
  "/placeholder.svg?height=100&width=80",
  "/placeholder.svg?height=100&width=80",
  "/placeholder.svg?height=100&width=80",
  "/placeholder.svg?height=100&width=80",
  "/placeholder.svg?height=100&width=80",
];

const garmentExamples = [
  "https://timshop.timhortons.ca/cdn/shop/files/retro-logo-tshirt-back-1000px.png?v=1707853862&width=1000?height=100&width=80",
  "/placeholder.svg?height=100&width=80",
  "/placeholder.svg?height=100&width=80",
  "/placeholder.svg?height=100&width=80",
  "/placeholder.svg?height=100&width=80",
  "/placeholder.svg?height=100&width=80",
  "/placeholder.svg?height=100&width=80",
  "/placeholder.svg?height=100&width=80",
  "/placeholder.svg?height=100&width=80",
  "/placeholder.svg?height=100&width=80",
  "/placeholder.svg?height=100&width=80",
  "/placeholder.svg?height=100&width=80",
];

// Sample data for try-on examples
const tryOnExamples = [
  {
    person: "/placeholder.svg?height=100&width=80",
    garment: "/placeholder.svg?height=100&width=80",
    result: "/placeholder.svg?height=100&width=80",
  },
  {
    person: "/placeholder.svg?height=100&width=80",
    garment: "/placeholder.svg?height=100&width=80",
    result: "/placeholder.svg?height=100&width=80",
  },
  {
    person: "/placeholder.svg?height=100&width=80",
    garment: "/placeholder.svg?height=100&width=80",
    result: "/placeholder.svg?height=100&width=80",
  },
];

export default function Home() {
  const [personImage, setPersonImage] = useState(null);
  const [garmentImage, setGarmentImage] = useState(null);
  const [resultImage, setResultImage] = useState(null);
  const [seed, setSeed] = useState(0);
  const [randomSeed, setRandomSeed] = useState(true);


  const handlePersonUpload = (info) => {
    const file = info.file.originFileObj; 
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

  const handleRun = () => {
    // In a real app, you would call an API to process the images
    // For this demo, we'll just use a placeholder
    
  };

  async function submitTryOn() {
    let personFile = personImage;
    let garmentFile = garmentImage;

    setResultImage("/placeholder.svg?height=300&width=200");
    if (!personFile || !garmentFile) {
        alert("Please upload both images!");
        return;
    }

    let personBase64 = await convertToBase64(personFile);
    let garmentBase64 = await convertToBase64(garmentFile);

  //   let tryonUrl = "http://your-api-url/Submit";  // Replace with actual API URL
  //   let headers = {
  //       "Content-Type": "application/json",
  //       "token": "your-token",  // Replace with actual token
  //       "Cookie": "your-cookie",
  //       "referer": "your-referer"
  //   };

  //   let response = await fetch(tryonUrl, {
  //       method: "POST",
  //       headers: headers,
  //       body: JSON.stringify({ clothImage: garmentBase64, humanImage: personBase64, seed: Math.random() * 999999 })
  //   });

  //   let result = await response.json();
  //   if (result.result.status !== "success") {
  //       alert("Error processing images");
  //       return;
  //   }

  //   let taskId = result.result.result;
  //   await checkTryOnResult(taskId);
  // }

  // async function checkTryOnResult(taskId) {
  //     let queryUrl = `http://your-api-url/Query?taskId=${taskId}`;  // Replace with actual API URL
  //     let headers = { "token": "your-token", "Cookie": "your-cookie", "referer": "your-referer" };

  //     for (let i = 0; i < 12; i++) {
  //         await new Promise(r => setTimeout(r, 9000));  // Wait 9 sec

  //         let response = await fetch(queryUrl, { headers: headers });
  //         let result = await response.json();

  //         if (result.result.status === "success") {
  //             let imgSrc = `data:image/jpeg;base64,${result.result.result}`;
  //             document.getElementById("resultImg").src = imgSrc;
  //             document.getElementById("resultImg").style.display = "block";
  //             return;
  //         }
  //     }
  //     alert("Try-on failed. Please try again later.");
  // }

  // async function convertToBase64(file) {
  //     return new Promise((resolve, reject) => {
  //         let reader = new FileReader();
  //         reader.readAsDataURL(file);
  //         reader.onload = () => resolve(reader.result.split(",")[1]);
  //         reader.onerror = error => reject(error);
  //     });
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
              <div className={styles.seedRow}>
                <Text>Seed</Text>
                <div className={styles.seedControls}>
                  <Slider
                    value={seed}
                    onChange={setSeed}
                    min={0}
                    max={100}
                    disabled={randomSeed}
                    className={styles.seedSlider}
                  />
                  <div className={styles.randomSeedToggle}>
                    <Switch
                      checked={randomSeed}
                      onChange={setRandomSeed}
                      size="small"
                    />
                    <Text>Random seed</Text>
                  </div>
                </div>
              </div>

              <div className={styles.runButtonContainer}>
                <Button
                  type="primary"
                  onClick={submitTryOn}
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
