import React from 'react';

class App extends React.Component {
    constructor  (props) {
        super(props);

        this.state = {
            search: '',
            forks: null,
        }
    }
    
    handleChange = (event) => {
        const search = event.currentTarget.value;
        this.setState({search});
    }

    handleSearch = () => {
        const {search} = this.state;
        
        fetch('https://api.github.com/repos/' + search + "/forks").then(response => {
            if(response.ok && response.status === 200){
                return response.json();
            }
            return [];
        }).then(forks => {
            this.setState({forks}) 
        }).catch((error) => {
            console.log('Error', error);
        });
    }

    render () {
        const {search, forks} = this.state;
        return (
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-lg-12'><h1>Hello </h1></div>
                    <div className='col-lg-12'>
                        <div className="input-group">
                            <input
                                className='form-control'
                                type='text' 
                                value={search}
                                onChange={this.handleChange}
                                placeholder="Search"
                            />
                            <div className="input-group-btn">
                                <button className="btn btn-default" onClick={this.handleSearch}>
                                    <i className="glyphicon glyphicon-search"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                {
                        forks &&
                        <div className='col-lg-12'>
                            <table className="table table-striped table-hover table-bordered table-responsive" style={{marginTop: "20px"}}>
                            <thead>
                                <tr>
                                    <th/>
                                    <th>Full name</th>
                                    <th>Owner</th>
                                    <th>Stars</th>
                                    <th>Link</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                   forks.length === 0 &&
                                    <tr><td colSpan={5}>No result</td></tr> 
                                }
                                {
                                    forks.map((fork, i)=>{
                                        return (
                                            <tr key={i}>
                                                <td>{i + 1}</td>
                                                <td>{fork.full_name}</td>
                                                <td>{fork.owner.login}</td>
                                                <td>{fork.stargazers_count}</td>
                                                <td>
                                                    <a href={fork.html_url} target="blank">{fork.html_url}</a>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                }
                </div>
          </div>  
        )
    }
}

export default App