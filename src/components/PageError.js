import React from "react";
import './pageError.scss'

export default function PageError() {
  return (
    <div >
      <div class="text">
        <p>404</p>
      </div>
      <div class="containerError container ">
        <div class="caveman">
          <div class="leg">
            <div class="foot">
              <div class="fingers"></div>
            </div>
          </div>
          <div class="leg">
            <div class="foot">
              <div class="fingers"></div>
            </div>
          </div>
          <div class="shape">
            <div class="circle"></div>
            <div class="circle"></div>
          </div>
          <div class="head">
            <div class="eye">
              <div class="nose"></div>
            </div>
            <div class="mouth"></div>
          </div>
          <div class="arm-right">
            <div class="club"></div>
          </div>
        </div>
        <div class="caveman">
          <div class="leg">
            <div class="foot">
              <div class="fingers"></div>
            </div>
          </div>
          <div class="leg">
            <div class="foot">
              <div class="fingers"></div>
            </div>
          </div>
          <div class="shape">
            <div class="circle"></div>
            <div class="circle"></div>
          </div>
          <div class="head">
            <div class="eye">
              <div class="nose"></div>
            </div>
            <div class="mouth"></div>
          </div>
          <div class="arm-right">
            <div class="club"></div>
          </div>
        </div>
      </div>
      <a href="/home" target="_blank">
        <div id="link">
          <i class="fab fa-codepen"></i>
          <p>Trang chủ</p>
        </div>
      </a>
    </div>
  );
}
