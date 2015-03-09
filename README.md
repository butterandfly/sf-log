# sf-log
该插件使用户可以方便地监听某元素的特定事件（默认为click），并执行特定回调（默认为window.___log）。

# 安装

### 下载sf-log.js（或sf-log.min.js）
直接下载sf-log.js文件，并在html中加入：
```
<script src="your-path/sf-log.js"></script>
```

### Bower
```
bower install --save sf-log
```

```
<script src="your-path/sf-log.js"></script>
```

# 使用
```
// 直接调用window.___log方法
sfLog.init();
```

```
// 使用自定义回调
sfLog.init({callback: function() {
  console.log("Log something...");
});
}
```