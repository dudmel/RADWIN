describe('Login', () => {

  beforeEach(() => {
    browser.get('/Login');
  });


  it('should able to log in', () => {
    //let subject = browser.getTitle();
    //let result  = 'RADWIN';
    //expect(subject).toEqual(result);

    element(by.name('username')).sendKeys('admin');
    element(by.name('password')).sendKeys('netman');

    element(by.id('cntrlsubmit')).click();
  });

});
