class CurveDrawer extends React.Component {
    //使用 React.createRef() 创建一个引用，用于在 componentDidMount 中初始化 ECharts 图表
    chartRef = React.createRef();

    generateData(func, minX, maxX, step) {
        let data = [];
        for (let x = minX; x <= maxX; x += step) {
            data.push([x, func(x)]);
        }
        return data;
    }

    updateChart = () => {
        const userInput = document.getElementById('functionInput').value;
        const precision = parseFloat(document.getElementById('precisionInput').value) || 0.1; // 默认精度为0.1
        try {
            // 使用 eval 解析用户输入的函数表达式
            const func = new Function('x', 'return ' + userInput); // 将用户输入的表达式作为返回值
            const data = this.generateData(func, -20, 20, precision);

            const option = {
                title: {
                    text: '函数曲线绘制器'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: [userInput]
                },
                xAxis: {
                    type: 'value',
                    name: 'x',
                    splitLine: { show: true },
                    min: -20,
                    max: 20
                },
                yAxis: {
                    type: 'value',
                    name: 'y',
                    splitLine: { show: true },
                    min: -20,
                    max: 20
                },
                series: [{
                    name: userInput,
                    type: 'line',
                    data: data,
                    smooth: true
                }]
            };

            // 使用 setOption 方法更新图表的配置和数据
            this.myChart.setOption(option);
        } catch (error) {
            alert('输入的函数无效，请检查您的表达式。');
        }
    }
    //在组件挂载后初始化echarts图表
    componentDidMount() {
        this.myChart = echarts.init(this.chartRef.current);
        this.updateChart(); // 初始绘制
    }

    render() {
        return (
            <div>
                <FunctionInput />
                <br />
                <PrecisionInput />
                <DrawButton onClick={this.updateChart} />
                <div ref={this.chartRef} style={{ width: '600px', height: '400px' }}></div>
            </div>
        );
    }
}

function FunctionInput(props) {
    return (
        <input type="text" id="functionInput" placeholder="请输入函数，例如：Math.sin(x)" />
    );
}

function PrecisionInput(props) {
    return (
        <input type="text" id="precisionInput" placeholder="请输入精度" />
    );
}

function DrawButton(props) {
    return (
        <button onClick={props.onClick}>
            绘制
        </button>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root1"));
root.render(
    <CurveDrawer />
);

