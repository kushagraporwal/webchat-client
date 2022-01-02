import React from 'react'
import img1 from '../images/ca3.png'
import img2 from '../images/ca6.png'
const Home = () => {
    return (
        <>
        <div className='container-fluid' style={{backgroundColor: '#DCE7EF', padding:'0px'}}>
        <div className='top1'>
        <div className='container'>
        <div className='row' >
        <div className='col-md-6' style={{marginTop: '70px'}}>
        <h1 className="one">Welcome to <br/><span style={{color:'#F3EC13'}}>Chat Website</span></h1>
        </div>
        <div className='col-md-6' style={{justifyContent: 'center', textAlign:'center', marginTop: '25px'}}>
        <img src={img1} alt="" className='i3'/>
        </div>
        </div></div>
        </div>
        <div className='container' style={{marginTop: '55px'}}>
        <div className='row' >
        <div className="col-md-4">
            <div className="card bg-dark text-light" style={{width: '80%', marginLeft: 'auto', marginRight: 'auto'}}>
                <div className="card-body text-center">
                    <div className="h1">
                        <i className="fa fa-user"></i>
                    </div>
                <h3 className="card-title">Users Info</h3>
                <p className="card-text">Distinct users are there having a unique email, account number and a current balance. Their information is available in the info page.</p>
            </div>
        </div>
        </div>
        <div className="col-md-4" style={{justifyContent:'center'}}>
        <img src={img2} alt="" className='i6'/>
        </div>
        <div className="col-md-4">
            <div className="card bg-dark text-light" style={{width: '80%', marginLeft: 'auto', marginRight: 'auto'}}>
                <div className="card-body text-center">
                    <div className="h1">
                    <i className="fa fa-lock"></i>
                    </div>
                <h3 className="card-title">Users Info</h3>
                <p className="card-text">Distinct users are there having a unique email, account number and a current balance. Their information is available in the info page.</p>
            </div>
        </div>
        </div>
        </div>
        </div>
        </div>
        </>
    )
}

export default Home
