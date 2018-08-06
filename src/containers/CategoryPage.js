import React, { Component } from 'react';
import { Link } from 'react-router';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import ContentCreate from 'material-ui/svg-icons/content/create';
import Delete from 'material-ui/svg-icons/action/delete';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { pink500, grey200, grey500 } from 'material-ui/styles/colors';
import PageBase from '../components/PageBase';
import axios from 'axios';
import { stringify } from 'querystring';


class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listCategory: [],
      open: false,
      currentId: '',
      nameValue: '',
      desValue: ''
    }
    this.handleDelete = this.handleDelete.bind(this);
    this.handleOpen = this.handleOpen.bind(this)
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeDes = this.handleChangeDes.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.getCurrentId = this.getCurrentId.bind(this);

  }


  getCategory() {
    axios.get('http://localhost:8000/get/categories', {
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    })
      .then((response) => {
        console.log('response:', response);
        this.setState({
          listCategory: response.data.data
        })
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  componentDidMount() {
    console.log("function had been run!")
    this.getCategory();
  }

  handleDelete(_id) {
    console.log(_id)
    axios.delete(`http://localhost:8000/delete/categories/${_id}`)
      .then(res => {
        this.getCategory();
        console.log(res)
        console.log('it works')
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  handleChangeName(event) {
    this.setState({ nameValue: event.target.value });    // this.setState({ desValue: event.target.value });

  }
  handleChangeDes(event) {
    this.setState({ desValue: event.target.value });    // this.setState({ desValue: event.target.value });

  }

  handleEdit(_id) {
    this.setState({ open: false });
    console.log('input1:', this.state.nameValue)
    console.log('input2:', this.state.desValue)

    axios.put(`http://localhost:8000/put/categories/${_id}`,
      stringify({
        categoryName: this.state.nameValue,
        description: this.state.desValue
      })
    )
    
      .then(function (response) {
        console.log(response);
        
      })
      .catch(function (error) {
        console.log(error);
      });
    event.preventDefault();
  }
  getCurrentId(_id) {
    console.log('clicked ', _id);
    this.setState({
      currentId: _id,
    })
  }

  handleOpen = (_id) => {
    this.setState({ open: true, currentId: _id });
  };

  handleClose = () => {
    this.setState({
      nameValue:'',
      desValue: '',
      open: false
    })
  };

  render() {
    // const { classes } = this.props;
    const styles = {
      floatingActionButton: {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
      },
      editButton: {
        fill: grey500
      },
      columns: {
        id: {
          width: '10%'
        },
        category: {
          width: '30%'
        },
        description: {
          width: '40%'
        },

        edit: {
          width: '10%'
        }
      }
    };
    console.log(this.state.open)
    return (
      <div>
        <PageBase title="Category Page"
          navigation="Category Page">

          <div>
            <Link to="/addcategory" >
              <FloatingActionButton style={styles.floatingActionButton} backgroundColor={pink500}>
                <ContentAdd />
              </FloatingActionButton>
            </Link>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHeaderColumn style={styles.columns.id}>ID</TableHeaderColumn>
                  <TableHeaderColumn style={styles.columns.category}>Cate gory</TableHeaderColumn>
                  <TableHeaderColumn style={styles.columns.description}>Description</TableHeaderColumn>
                  <TableHeaderColumn style={styles.columns.edit}>Edit</TableHeaderColumn>
                  <TableHeaderColumn style={styles.columns.edit}>Del</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody>
                {this.state.listCategory.map(item =>
                  <TableRow key={item._id}>
                    <TableRowColumn style={styles.columns.id}>{item._id}</TableRowColumn>
                    <TableRowColumn style={styles.columns.categoryName}>{item.categoryName}</TableRowColumn>
                    <TableRowColumn style={styles.columns.description}>{item.description}</TableRowColumn>
                    <TableRowColumn style={styles.columns.edit}>

                      <FloatingActionButton

                        onClick={() => { this.handleOpen(item._id) }}
                        zDepth={0}
                        mini={true}
                        backgroundColor={grey200}
                        iconStyle={styles.editButton}>
                        <ContentCreate />
                      </FloatingActionButton>

                    </TableRowColumn>
                    <TableRowColumn style={styles.columns.edit}>
                      <FloatingActionButton className="button" zDepth={0}
                        onClick={() => { this.handleDelete(item._id) }}
                        mini={true}
                        backgroundColor={grey200}
                        iconStyle={styles.editButton}>
                        <Delete />
                      </FloatingActionButton>
                    </TableRowColumn>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="form-dialog-title"
            >

              <TextField
                hintText="Name"
                floatingLabelText="Name"
                fullWidth={true}
                value={this.state.nameValue}
                onChange={(e) => { this.handleChangeName(e, 'name') }}
              />
              <TextField
                hintText="Description"
                floatingLabelText="Description"
                fullWidth={true}
                value={this.state.desValue}
                onChange={this.handleChangeDes}
              />


              <FlatButton style={{ float: 'right' }} onClick={this.handleClose}>
                Cancel
            </FlatButton>
              <FlatButton style={{ float: 'right' }} onClick={() => { this.handleEdit(this.state.currentId) }} color="primary">
                Subscribe
            </FlatButton>

            </Dialog>
          </div>
        </PageBase>

      </div>
    )
  }
}

export default Category;


// import React from 'react';
// import {Link} from 'react-router';
// import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
// import FloatingActionButton from 'material-ui/FloatingActionButton';
// import ContentCreate from 'material-ui/svg-icons/content/create';
// import ContentAdd from 'material-ui/svg-icons/content/add';
// import {pink500, grey200, grey500} from 'material-ui/styles/colors';
// import PageBase from '../components/PageBase';
// // import Data from '../data';
// import {getCategory} from '../Category';

// const CategoryPage = () => {

//   const styles = {
//     floatingActionButton: {
//       margin: 0,
//       top: 'auto',
//       right: 20,
//       bottom: 20,
//       left: 'auto',
//       position: 'fixed',
//     },
//     editButton: {
//       fill: grey500
//     },
//     columns: {
//       id: {
//         width: '10%'
//       },
//       category: {
//         width: '50%'
//       },
//       description: {
//         width: '40%'
//       },

//       edit: {
//         width: '10%'
//       }
//     }
//   };

//   return (
//     <PageBase title="Category Page"
//               navigation="Application / Category Page">

//       <div>
//         <Link to="/form" >
//           <FloatingActionButton style={styles.floatingActionButton} backgroundColor={pink500}>
//             <ContentAdd />
//           </FloatingActionButton>
//         </Link>

//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHeaderColumn style={styles.columns.id}>ID</TableHeaderColumn>
//               <TableHeaderColumn style={styles.columns.category}>Cate gory</TableHeaderColumn>
//               <TableHeaderColumn style={styles.columns.description}>Description</TableHeaderColumn>
//               <TableHeaderColumn style={styles.columns.edit}>Edit</TableHeaderColumn>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {getCategory().map(item =>
//               <TableRow key={item.id}>
//                 <TableRowColumn style={styles.columns.id}>{item.id}</TableRowColumn>
//                 <TableRowColumn style={styles.columns.category}>{item.category}</TableRowColumn>
//                 <TableRowColumn style={styles.columns.description}>{item.description}</TableRowColumn>
//                 <TableRowColumn style={styles.columns.edit}>
//                   <Link className="button" to="/form">
//                     <FloatingActionButton zDepth={0}
//                                           mini={true}
//                                           backgroundColor={grey200}
//                                           iconStyle={styles.editButton}>
//                       <ContentCreate  />
//                     </FloatingActionButton>
//                   </Link>
//                 </TableRowColumn>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>    
//       </div>
//     </PageBase>
//   );
// };

// export default CategoryPage;

