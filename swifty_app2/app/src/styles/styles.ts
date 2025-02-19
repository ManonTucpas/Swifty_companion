import { StyleSheet } from "react-native";
import { Colors } from '@/constants/Colors';

const styles = StyleSheet.create({
  //Main container
  container: {
    flex: 1,
    padding: 16,
  },

  // Header Container
  headerContainer: {
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    backgroundColor: Colors.light.background,
    borderBottomWidth: 1,
    borderColor: Colors.light.divider,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },

  // Centered Container
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.light.background,
    borderRadius: 8,
    padding: 20,
    marginVertical: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 5,
  },

  // Text Styles
  title: {
    color: Colors.light.primary,
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    margin: 8,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.light.muted,
    textAlign: "center",
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: Colors.light.dark,
    lineHeight: 24,
  },

  // Image
  image: {
    marginBottom: 8,
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: Colors.light.primary,
  },

  // Button
  buttonPrimary: {
    backgroundColor: Colors.light.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
  },
  buttonPrimaryText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.light.subtleGray,
  },
  buttonSecondary: {
    backgroundColor: Colors.light.secondary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
  },
  buttonSecondaryText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.light.primary,
  },

  // Input Styles
  input: {
    borderWidth: 1,
    borderColor: Colors.light.borderGray,
    borderRadius: 8,
    padding: 10,
    marginVertical: 8,
    fontSize: 16,
    color: Colors.light.dark,

  },

  // Divider
  divider: {
    height: 1,
    backgroundColor: Colors.light.divider,
    marginVertical: 12,
    marginBottom: 24,

  },

  //Level Bar
  levelBar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.light.secondary,
    padding: 10,
    borderRadius: 10,
    marginTop: 16,
  
  },

  // Back Button (for arrow)
  backButton: {
    position: "absolute",
    left: 16,
    padding: 8,
  },

  // Item for skills and projects
  itemContainer: {
    flexDirection: "row",
    padding: 10,
    borderRadius: 10,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,

    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: Colors.light.background,
  },
  itemIconStatus: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  itemTextName: {
    color: Colors.light.primary,
    fontWeight: "bold",
    fontSize: 18,
    flex: 3,
  },
  itemTextScore: {
    color: Colors.light.muted, 
     
    fontSize: 16,
    flex: 1,
    textAlign: 'right',
  }
});

export default styles;