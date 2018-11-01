<!DOCTYPE HTML>
<html>
<head>
    <meta charset='utf-8'>
    <title>{{ title }}</title>
    <style>
        ul{
            list-style: none;
            width: 800px;
            min-height: 300px;
            margin: 100px auto 0 auto;
        }
        ul li{
            float: left;
            padding: 5px 10px;
            height: 20px;
            line-height: 20px;
            border: 1px solid #58D9B0;
            border-radius: 20px;
            text-align: center;
            margin: 10px;
            color: #000;
        }
        ul li a{
            display: inline-block;
            width: 100%;
            height: 100%;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <ul>
        {{#each files}}
            <li>
                <a href="{{../dir}}/{{this}}">{{this}}</a>
            </li>
        {{/each}}
    </ul>
</body>
</html>