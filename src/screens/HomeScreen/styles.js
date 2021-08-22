import {StyleSheet, Dimensions} from "react-native";
const screenWidth = Dimensions.get("window").width;
export default StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 50,
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerRightButton: {
    width: 40,
    height: 40,
    marginRight: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  overlayLabelLeft: {
    backgroundColor: "transparent",
    borderColor: "red",
    color: "red",
    borderWidth: 2,
  },
  overlayLabelRight: {
    backgroundColor: "transparent",
    borderColor: "green",
    color: "green",
    borderWidth: 2,
  },
  overlayWrapperLeft: {
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "flex-start",
    marginTop: 30,
    marginLeft: -30,
    elevation: 5,
  },
  overlayWrapperRight: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginTop: 30,
    marginLeft: 30,
    elevation: 5,
  },
  fabLike: {
    position: "absolute",
    margin: 16,
    right: screenWidth / 6,
    bottom: 10,
    backgroundColor: "red",
  },
  fabDislike: {
    position: "absolute",
    margin: 16,
    left: screenWidth / 6,
    bottom: 10,
    backgroundColor: "black",
  },
  loadingContainer: {
    flex: 1,
    width: "100%",
    alignSelf: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)"
  },
  bottomContainer: {
    position: "absolute",
    flexDirection: 'row',
    left: 0,
    right: 0,
    bottom: 0,
  },
});
