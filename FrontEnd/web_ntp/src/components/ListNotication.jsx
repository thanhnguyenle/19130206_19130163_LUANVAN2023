import React, {useState} from 'react';
import {MDBIcon} from "mdb-react-ui-kit";
import inbox from "../../assets/images/inbox.png";
export default function ListNotication() {
    const notications = [
        'Creola1',
        'Mario ',
        'Mohammad ',
        'Creola',
        'Mario ',
        'Mohammad ',
        'Creola2',
        'Mario 3',
        'Mohammad ',
        'Creola',
        'Mario ',
        'Mohammad ',
        'Creola2',
        'Mario ',
        'Mohammad 3',
        'Creola',
    ];
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 3;
    const lastIndex = currentPage * recordsPerPage;
    const  firstIndex = lastIndex - recordsPerPage;
    const records = notications.slice(firstIndex,lastIndex);
    const npage = Math.ceil(notications.length / recordsPerPage);
    const numbers = [...Array(npage+1).keys()].slice(1);
    function prePage(){
      if(currentPage !== 1){
          setCurrentPage(currentPage-1)
      }
    }
    function nextPage(){
       if(currentPage !== npage){
           setCurrentPage(currentPage + 1)
       }
    }
    function changeCPage(id){
     setCurrentPage(id)
    }
    const listItems =(notications.length > 0) ? records.map((d,i) =>
        <div className='itemNotication' key={i}>
        <div className='bgCrire'>
            <MDBIcon far icon="bell" />
        </div>
        <p>{d}</p>
    </div>) :  <div className='text-center'>
        <img src={inbox} alt="" style={{width:'200px'}}/>
        <p style={{color:'grey'}}>{t('no_notifications')}</p>
    </div>
    return <div className="listNotication">
        <div className='list-group' >{listItems}</div>
        <nav>
            <ul className="pagination">
                <li className="page-item">
                    <a href="src/components/navbar#" onClick={prePage} className='page-link'>Prev</a>
                </li>
                {
                    numbers.map((n,i) => (
                        <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                            <a href="src/components/navbar#" className='page-link' onClick={() => changeCPage(n)}>{n}</a>
                        </li>
                    ))
                }
                <li className="page-item">
                    <a href="src/components/navbar#" onClick={nextPage} className='page-link'>Next</a>
                </li>
            </ul>
        </nav>
    </div>
}
