export const handlerKeyPress = (e: any,func:()=>void) => {
  if (e.charCode === 13) {
    func()
  }
}
