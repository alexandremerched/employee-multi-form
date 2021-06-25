import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6
  },
  fieldsContainer: {
    width: '100%',
    marginTop: 10
  },
  input: {
    borderWidth: 1,
    borderRadius: 4,
    // minWidth: 57,
    paddingVertical: 5
  },
  errorText: {
    color: '#c00',
    fontSize: 12,
    marginTop: 4
  }
})

export default styles