import React from 'react';

const Pagination = ({ postsPerPage, totalPosts, paginate ,currentPage}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul  style={{display:'flex',
    justifyContent:'center',
    gap:' 94px'
}}>
        {pageNumbers.map(number => (
          <li key={number} onClick={() => paginate(number)}   style={{display:'block',fontSize:number===currentPage?'50px':'20px'}}>
              {number}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;