import React, { Component } from "react";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import apiInstance from "../../api";
import EmotionPanel from "./EmotionPanel";
import { MaterialIcons, Ionicons, AntDesign } from "@expo/vector-icons";

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.camera = React.createRef();
    this.state = {
      hasCameraPermission: true,
      type: Camera.Constants.Type.front,
      anger: null,
      contempt: null,
      disgust: null,
      fear: null,
      happiness: null,
      neutral: null,
      sadness: null,
      surprise: null
    };
  }

  componentDidMount() {
    // Hide StatusBar
    StatusBar.setHidden(true);

    // Camera Permission
    Permissions.askAsync(Permissions.CAMERA_ROLL);
    Permissions.askAsync(Permissions.CAMERA).then(({ status }) => {
      console.log("camera permission: ", status);
      this.setState({ hasCameraPermission: status === "granted" });
    });
  }

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          {/*Emotion Panel*/}
          <EmotionPanel
            anger={this.state.anger}
            contempt={this.state.contempt}
            disgust={this.state.disgust}
            fear={this.state.fear}
            happiness={this.state.happiness}
            neutral={this.state.neutral}
            sadness={this.state.sadness}
            surprise={this.state.surprise}
          />

          {/*Camera Panel*/}
          <Camera
            ref={ref => (this.camera = ref)}
            ratio="16:9"
            style={{ flex: 1 }}
            type={this.state.type}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: "transparent",
                flexDirection: "row",
                justifyContent: "space-between",
                marginLeft: 50,
                marginRight: 50,
                marginBottom: 10
              }}
            >
              <TouchableOpacity
                style={{
                  alignSelf: "flex-end",
                  alignItems: "center"
                }}
              >
                <AntDesign name="picture" color="white" size={37} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  alignSelf: "flex-end",
                  alignItems: "center"
                }}
                onPress={() => this.snap()}
              >
                <MaterialIcons name="camera" color="skyblue" size={43} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  alignSelf: "flex-end",
                  alignItems: "center"
                }}
                onPress={() => {
                  this.setState({
                    type:
                      this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                  });
                }}
              >
                <Ionicons name="md-reverse-camera" color="white" size={37} />
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }

  snap = async () => {
    if (this.camera) {
      const photo = await this.camera.takePictureAsync({ base64: true });
      const asset = await MediaLibrary.createAssetAsync(photo.uri);
      MediaLibrary.createAlbumAsync("EmotionCam", asset, true)
        .then(() => console.log("album created and asset saved"))
        .catch(e => console.log(e));

      // Save Image To Cloudinary and Analyze Emotion
      apiInstance
        .saveImageCloudinary(photo.base64)
        .then(async ({ data }) => {
          // When Success, Analyze Emotion
          console.log(data.secure_url);
          apiInstance
            .analyzeEmotion(data.secure_url)
            .then(({ data }) => {
              console.log(data[0]);
              const e = data[0].faceAttributes.emotion;
              this.setState({
                anger: e.anger,
                contempt: e.contempt,
                disgust: e.disgust,
                fear: e.fear,
                happiness: e.happiness,
                neutral: e.neutral,
                sadness: e.sadness,
                surprise: e.surprise
              });
            })
            .catch(e => console.log(e));
        })
        .catch(e => console.log(e));
    }
  };
}

export default HomeScreen;
