import React, { Component } from "react";
import { FlatList, StyleSheet, Text, View,AppRegistry, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import Header from "./components/header";
// import moment from 'moment';

export default class App extends Component {
  state = {
    data: []
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    const response = await fetch("http://192.168.1.5:3000/api/Mycollection");
    const json = await response.json();
    // console.log(json);
    this.setState({ data: json });
  };
    renderButton = ()=>{
      return(
        <TouchableOpacity><Text>accept</Text></TouchableOpacity>
      );
    };

  renderItem = (item) => {
    if(item.requestType == "Called" || item.requestType == "called" ) {
      return(
        <Text style = {styles.item}>
             room number : {` ${item.roomNumber}`} {"\n"}
             {/* date: {`${Date(parseInt((item.timestamp).toString().substring(0,8), 16)*100)}`} */}
              time called :  {` ${(item.timestamp).toString().substring(11,19)}`}{"\n"}
             date : {` ${(item.timestamp).toString().substring(0,10)}`}
            </Text>
          
            
      );
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Header/>
        <View style={styles.content}>
        <View style={styles.list}>
        <FlatList 
          style={{width: '100%'}}
          data={this.state.data}
          keyExtractor={(x, i) => i}
          inverted={true}
          // refreshing={this.state.refresh}
          // onRefresh={this.loadNewTemps} //CREATE A NEW FUNCTION LOAD NEW TEMPS THAT FETCHES DATA FROM SERVER 
          renderItem={({ item }) =>
            this.renderItem(item)
           
          }
     
            // inverted
        />
       
        </View>
        
        </View>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // marginTop: 30,
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  
  content:{
    padding: 40,
    marginBottom:20,
    
     // justifyContent: "center",
    // alignItems: "center",
  },
  list:{
    // marginTop:10,
    marginBottom: 50,
   
    
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
  item: {
    padding: 16,
    marginTop: 16,
    borderColor:'#bbb',
    borderWidth:1,
    borderStyle:'dashed',
    borderRadius:10,
    textAlign:"center",
    flexDirection:'row',
    justifyContent: 'space-between',
    // marginBottom:20,
    
}
  

});

AppRegistry.registerComponent("flatlists", () => App);