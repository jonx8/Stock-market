import time

from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()

# login
driver.get("http://localhost:3001/login")
driver.implicitly_wait(5)
login_input = driver.find_element(By.XPATH, '//*[@id="input-0"]')
login_btn = driver.find_element(By.XPATH, '//*[@id="login-form"]/button')

login_input.send_keys('xekoro10')
login_btn.click()

time.sleep(5)

# State before
balance_element = driver.find_element(By.XPATH, '//*[@id="broker-balance"]')
balance_before = float(balance_element.get_attribute('innerText'))

# Open dialog for buy stocks
driver.find_element(By.XPATH, '//*[@id="app"]/div/div/main/div/div[2]/div[1]/div[2]/div/div[4]/button[2]').click()
time.sleep(1)

# Buy stocks
quantity_input = driver.find_element(By.XPATH, '//*[@id="quantity-field"]')
quantity_input.clear()
quantity_input.send_keys('5')
price_element = driver.find_element(By.XPATH, '//*[@id="stock-price"]')
price_before = float(price_element.get_attribute('innerText'))
driver.find_element(By.XPATH, '/html/body/div[2]/div/div[2]/div/div[4]/button[1]').click()

# State after
time.sleep(2)
balance_after = float(balance_element.get_attribute('innerText'))
print(balance_before - price_before * 5, balance_after)
assert (abs(balance_after + price_before * 5 - balance_before) < 0.005)

# Check profit
time.sleep(4)
profit_element = driver.find_element(By.XPATH, '//*[@id="app"]/div/div/main/div/div[2]/div/div[2]/div/div[3]/p[4]/span')
profit = float(profit_element.get_attribute('innerText'))
price_element2 = driver.find_element(By.XPATH, '//*[@id="app"]/div/div/main/div/div[2]/div/div[2]/div/div[3]/p[3]/span')
price_after = float(price_element2.get_attribute('innerText'))
print(price_after, price_before)
print(profit, (price_after - price_before) * 5)
assert (abs(balance_after + price_before * 5 - balance_before) < 0.005)

time.sleep(5)
