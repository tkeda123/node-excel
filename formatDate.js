export const formatDate = (date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 1を加えて月を取得し、2桁のゼロ埋めを行う
  const day = date.getDate().toString().padStart(2, '0'); // 日を2桁のゼロ埋めを行う
  return `${year}/${month}/${day}`;
};

// 現在の日付を yyyy/mm/dd フォーマットに変換
