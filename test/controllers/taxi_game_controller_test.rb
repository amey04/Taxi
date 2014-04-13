require 'test_helper'

class TaxiGameControllerTest < ActionController::TestCase
  test "should get Description" do
    get :Description
    assert_response :success
  end

  test "should get Play" do
    get :Play
    assert_response :success
  end

  test "should get Questionnaire" do
    get :Questionnaire
    assert_response :success
  end

  test "should get Summary" do
    get :Summary
    assert_response :success
  end

end
