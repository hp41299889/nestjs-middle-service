const scheduleColumns = [
  {
    data: 'scheduleID',
    title: '排程ID',
  },
  {
    data: 'scheduleName',
    title: '排程名稱',
  },
  {
    data: 'commandSource',
    title: '命令來源',
  },
  {
    data: 'scheduleType',
    title: '排程類型',
  },
  {
    data: 'regular',
    title: '定期排程',
    render: function (data, type, row) {
      let text = '';
      if (type === 'display') {
        // console.log('regular-data =', data);
        // console.log('regular-type =', type);
        // console.log('regular-row =', row);
        if (row.scheduleType == 'regular') {
          // console.log('regular');
          if (data != null && data != undefined) {
            data.forEach((element) => {
              // console.log('regular-element =', element);
              if (text == '') {
                text = element;
              } else {
                text = text + '<br>' + element;
              }
            });
            // text = data;
          } else {
            text = '';
          }
        }
        // console.log('regular-text =', text);
      }
      return text;
    },
  },
  {
    data: 'cycle',
    title: '週期排程',
    render: function (data, type, row) {
      let text = '';
      if (type === 'display') {
        // console.log('cycle-data =', data);
        // console.log('cycle-type =', type);
        // console.log('cycle-row =', row);
        if (row.scheduleType == 'cycle') {
          if (data != null && data != undefined) {
            data.forEach((element) => {
              if (text == '') {
                text = element;
              } else {
                text = text + '<br>' + element;
              }
            });
          } else {
            text = '';
          }
        }
      }
      return text;
    },
  },
  {
    data: 'createDatetime',
    title: '創建日期時間',
  },
  {
    data: 'lastEditDatetime',
    title: '最後編輯日期時間',
  },
  {
    data: 'MQCLI',
    title: 'MQCLI命令',
  },
];

const executionLogColumns = [
  {
    data: 'scheduleLogID',
    title: '紀錄ID',
  },
  {
    data: 'scheduleID',
    title: '排程ID',
  },
  {
    data: 'scheduleName',
    title: '排程名稱',
  },
  {
    data: 'scheduleType',
    title: '排程類型',
  },
  {
    data: 'processDatetime',
    title: '執行日期時間',
  },
  {
    data: 'processStatus',
    title: '執行狀態',
  },
  {
    data: 'schedule',
    title: '排程命令',
  },
  {
    data: 'MQCLI',
    title: 'MQCLI命令',
  },
]