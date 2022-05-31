import React from 'react'
import "./sideBar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
      <h2 class="blog-sidebar-title"><b>Categories</b></h2>   
      <p class="blog-sidebar-list"><b>Coffee</b></p>
					<p class="blog-sidebar-list"><b> technique</b></p>
					<p class="blog-sidebar-list"><b>informatique</b></p>
					<p class="blog-sidebar-list"><b>gestion</b></p>
					<p class="blog-sidebar-list"><b> bozzard</b></p>
					<p class="blog-sidebar-list"><b>paint</b></p>
					<p class="blog-sidebar-list"><b> hello</b></p>
      </div>
    </div>
  );
}
