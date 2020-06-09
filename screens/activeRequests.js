import React, { Component } from "react";
import { FlatList, StyleSheet, Text, View,AppRegistry, TouchableOpacity, Alert } from "react-native";
import { RefreshControl} from 'react-native';


const apiurl = "http://192.168.1.43:3000/api/AcceptedRequests";

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
      refreshing: true
    };
    this.fetchData = this.fetchData.bind(this);
  }
 
  
  componentDidMount() {
    this.fetchData();
    
  }

  
  //----------------------------------------------------------------------------------------------------------------------
  //FETCHING DATA FROM API AND CONVERTING IT TO JSON
  fetchData = async () => {
    const response = await fetch("http://192.168.1.43:3000/api/activeRequests");
    const json = await response.json();
    // console.log(json);
    this.setState({ data: json ,
      refreshing: false});
  };
//------------------------------------------------------------------------------------------------------------------------
//FUNCTION THAT SENDS ACCEPTED REQUEST TO API(LOGGING)


  acceptRequest= (params)=>{    
   try{
      console.log(params);
    fetch(apiurl , {
   method: 'POST', 
   mode : 'no-cors',
   headers: {
    'Accept' : 'application/json',
    'Content-Type': 'application/json'
  },
   body:  JSON.stringify(params)
}).then(
  fetch('http://192.168.1.43:3000/api/activeRequests/delete'+params._id, {
      method: 'delete'
   })
).done();
      console.log("HERE 1");
    } catch (error){
      console.log(`Error is : ${error}`);
    }
    
  };
   
  
//------------------------------------------------------------------------------------------------------------------------
    //FUNCTION THAT HANDLES ITEM PRESS 
     pressHandler = (item)=>{
      //  console.log(item);
       Alert.alert(
        "Accept this request?",
        "if you do press yes.",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => this.acceptRequest(item) }
        ],
        { cancelable: false }
      );
  
     };
     //--------------------------------------------------------------------------------------------------------------------------------
//REFRESHING DATA
     onRefresh() {
      //Clear old data of the list
      this.setState({ data: [] });
      //Call the Service to get the latest data
      this.fetchData();
    }
  //----------------------------------------------------------------------------------------------------------------------
  //RENDERING FLATLIST ITEMS
  renderItem = (item) => {
    if(item.requestType == "Called" || item.requestType == "called" ) {
      return(
        <TouchableOpacity onPress={()=> this.pressHandler(item)}>
          <Text style = {styles.item}>
             room number : {` ${item.roomNumber}`} {"\n"}
            
              time called :  {` ${(item.timestamp).toString().substring(11,19)}`}{"\n"}
             date : {` ${(item.timestamp).toString().substring(0,10)}`}
            </Text>
        </TouchableOpacity>    
      );
    }
  };
  //----------------------------------------------------------------------------------------------------------------------
  render() {
    return (
      <View style={styles.container}>
        {/* <Header/> */}
        <View style={styles.content}>
        <View style={styles.list}>
        <FlatList 
          style={{width: '100%'}}
          data={this.state.data}
          extraData={this.state.data}
          keyExtractor={(x,i) => i.toString()}
          inverted={true}
          refreshControl={
            <RefreshControl
              //refresh control used for the Pull to Refresh
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh.bind(this)}
              />}
         
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
   
    flex: 1,
   
    backgroundColor: "#F5FCFF"
  },
  
  content:{
    padding: 40,
    marginBottom:20,
    
    
  },
  list:{
   
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
   
    
}
  

});

