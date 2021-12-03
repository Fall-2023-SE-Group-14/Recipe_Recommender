import React, { Component } from "react";

// Form component to maintain input form
class Form extends Component {
  // constructor for Form Component
  // We maintain user input as a state object
  constructor() {
    super();

    this.state = {
      // cuisine : "Any",
      //numberIngredients : 0,
      ingredients: new Set(),
      cuisineState: 0,
      cuisine: "",
    };
  }

  // function to change cuisine state, triggered on selection of a cuisine item.
  /*cuisineUpdate = (event) => {

        this.setState (
            {
                cuisine : event.target.value,
                numberIngredients : this.state.numberIngredients,
                ingredients : this.state.ingredients
            }, () => console.log( this.state )
        )
    }
    */
  // function to update the maximum number of ingredients in the state.
  /*numberUpdate = (event) =>
    {
        this.setState (
            {
                cuisine : this.state.cuisine,
                numberIngredients: event.target.value,
                ingredients:this.state.ingredients
            }, () => console.log( this.state )
        )
    }*/

  // function to display the ingredients added by the user upto that point.
  printHander = () => {
    // converting the set into an array, to make it iterable
    const items = [...this.state.ingredients];

    // mapping each item to be displayed as a list item
    const list_items = items.map((item) => (
      <li onMouseDown={this.removeHandler} id={item} class="addedIngredient">
        {" "}
        {item}
      </li>
    ));

    return <ul class="addedIngredientList">{list_items}</ul>;
  };

  // fucntion to add ingredients to the inredients (set datastructure) in App's state
  // triggered by clicking add item button
  addHandler = (event) => {
    const ingredient = document.getElementById("ingredient").value;

    this.setState(
      {
        //cuisine : this.state.cuisine,
        //numberIngredients : this.state.numberIngredients,
        ingredients: new Set(this.state.ingredients).add(ingredient),
      },
      () => console.log(this.state)
    );

    document.getElementById("ingredient").value = "";
  };

  // fucntion to add ingredients to the inredients (set datastructure) in App's state
  // triggered by clicking item that is displayed ysing printHandler function
  removeHandler = (event) => {
    var discardIngredient = event.target.id;
    var ingredientList = this.state.ingredients;

    ingredientList.delete(discardIngredient);

    this.setState(
      {
        //cuisine : this.state.cuisine,
        //numberIngredients : this.state.numberIngredients,
        ingredients: ingredientList,
      },
      () => console.log(this.state)
    );
  };

  // function to send the data to the parent App component
  // uses the function that is sent through props from the App Component
  handleSubmit = (event) => {
    // this.setState(
    //   {
    //     //cuisine : this.state.cuisine,
    //     //numberIngredients : this.state.numberIngredients,
    //
    //     ingredients: new Set(this.state.ingredients).add(
    //       document.getElementById("cuisine").value
    //     ),
    //   },
    //   () => console.log(this.state)
    // );

    this.setState(
      {
        //cuisine : this.state.cuisine,
        //numberIngredients : this.state.numberIngredients,

        cuisine: document.getElementById("cuisine").value,
      },
      () => console.log(this.state)
    );

    event.preventDefault();
    var dict = {};
    dict["ingredient"] = this.state.ingredients;
    dict["cuisine"] = document.getElementById("cuisine").value;
    dict["email_id"] = document.getElementById("email_id").value;
    dict["flag"] = document.getElementById("Send_email").checked;
    dict["time_to_cook"] = document.getElementById("time_to_cook").value;
    console.log("dict value", dict["time_to_cook"]);
    //this.props.sendFormData(this.state.cuisine, this.state.numberIngredients,this.state.ingredients)
    this.props.sendFormData(dict);
    document.getElementById("cuisine").value = "";
    document.getElementById("email_id").value = "";
    document.getElementById("time_to_cook").value = "";
  };

  // render function dispays the UI content i.e the form content
  render() {
    {
      /* const cuisine_list = [ "Any", "Mexican", "Swedish", "Latvian", "Italian",
        "Spanish", "American","Scottish","British","Thai","Japanese","Chinese",
        "Indian","Canadian","Russian","Jewish","Polish","German","French","Hawaiian",
        "Brazilian", "Peruvian","Cuban","Tibetian","Salvadorian","Egyptian","Greek",
        "Belgian","Irish","Welsh","Mormon","Cajun","Portugese","Turkish","Haitian",
    "Tahitian","Kenyan","Korean","Algerian","Nigerian","Libyan" ]*/
    }

    // returns jsx element
    return (
      <div class="formOutercontainer">
        <form onSubmit={this.handleSubmit}>
          <div className="row pb-1">
            <div className="input-group col-lg-4 bg-danger text-white">
              <label class="sideLabel"> Ingredient: </label> <br />
              <div className="input-group-append">
                <input type="text" id="ingredient" />

                <button onClick={this.addHandler} type="button" id="addButton">
                  {" "}
                  Add item{" "}
                </button>
              </div>
            </div>
          </div>

          <div className="row pb-1">
            <div className="input-group col-lg-4 bg-danger text-white">
              <label class="sideLabel"> Cuisine: </label> <br />
              <div className="input-group-append">
                <input type="text" id="cuisine" />
              </div>
            </div>
          </div>

          <div className="row pb-1">
            <label for="time_to_cook">Time to cook:</label>
            <select name="time_to_cook" id="time_to_cook">
              <option value="15">15</option>
              <option value="30">30</option>
              <option value="45">45</option>
              <option value="60">60</option>
            </select>
          </div>

          <div className="row pb-1">
            <div className="input-group col-lg-4 bg-danger text-white">
              <label class="sideLabel"> Enter Email ID: </label> <br />
              <div className="input-group-append">
                <input type="text" id="email_id" />
                <div>
                  <label>
                    <input type="checkbox" id="Send_email" name="email" /> Send
                    me email
                  </label>
                  <label>
                    <input type="checkbox" id="food_preference" name="food_option" /> Vegetarian
                  </label>
                </div>

                <div className="row pb-1">
                  <div className="input-group col-lg-4">
                    <label class="sideLabel">Added Items:</label>
                    <br />
                    <br />
                    <br />
                    {this.printHander()}
                  </div>
                </div>
                {/*
                     <div className="row pb-1">
                    <div className="input-group col-lg-4">
                        <label class='sideLabel'>Maximum Number of Ingredients: </label><br/>
                        <div className="input-group-append">
                        <input type = "number" id = "NoIngredient" onChange = {this.numberUpdate} />
                        </div>
                    </div>
                    </div>

                    <div className="row pb-1">
                    <div className="input-group col-lg-4">
                        <label class='sideLabel'> Cusine Selection: </label><br/><br/>
                        <select value={this.state.cuisine} onChange={this.cuisineUpdate} >
                            {
                                cuisine_list.map( (category, i) => <option key = {i}> {category} </option> )
                            }
                        </select>
                    </div>
                        </div>*/}

                <div className="row pb-1">
                  <div className="input-group col-lg-4">
                    <button
                      type="button"
                      id="submit"
                      onClick={this.handleSubmit}
                    >
                      <h4> Search Recipes </h4>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Form;
