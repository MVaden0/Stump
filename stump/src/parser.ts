export const jsParseCFG = {
  'symbols': [
    {
      'symbol': 'A',
      'name': 'delimeter',
      'color': '#848bbd'
    },
    {
      'symbol': 'B',
      'name': 'keyword',
      'color': '#fede5d'
    },
    {
      'symbol': 'C',
      'name': 'variable',
      'color': '#ff7edb'
    },
  ],
  'alphabet': [
    {
        'delimeter': [' ', '.', '{', '}', '(', ')', '[', ']', ';', '=']
    },
    {
        'keyword': ['self']
    }
  ],
  'grammar': [
    {
        'symbol': 'A'
    }
  ]
}