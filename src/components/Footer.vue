<template>
  <div class="footer">
    <p>"maimai DX"及舞萌DX图标素材属于舞萌DX</p>
    <p>（世嘉互动有限公司），仅用于展示和非商业目的使用。</p>
    <div class="grid">
      <p>工具作者</p><a href="https://im0o.top" target="_blank">0o酱</a>
      <p>开源地址</p><a href="https://github.com/jz0ojiang/go-maimai-player-counter" target="_blank">Github</a>
    </div>
    <p>API 使用请联系作者 <a href="mailto:hi@im0o.top">Email</a></p>
    <p>广告位招租/赞助通道：<a href="javascript:alert('还没做这功能，欢迎直接联系作者投喂')">施工中</a></p>
  </div>
</template>

<style lang="scss" scoped>
.footer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  text-align: center;
  .grid {
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(2, 2fr 1fr);
    text-align: left;
  }
  p {
    color: #fff;
    font-size: 14px;
    margin: 0;
    padding: 0;
  }
  a {
    color: #fa8e53;
    font-weight: 500;
    text-decoration: none;
  }
  a:hover {
    color: #f9a77c;
  }
}
</style>
