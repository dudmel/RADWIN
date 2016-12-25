describe('Login', () => {

  beforeEach(() => {
    browser.get('/Login');
  });


  it('should able to log in', () => {

    element(by.name('username')).sendKeys('admin');
    element(by.name('password')).sendKeys('netman');
    element(by.id('cntrlsubmit')).click();
  });

});
