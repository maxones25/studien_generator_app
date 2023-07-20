<?php

class UpdateSubscription extends Base {
    protected function validateInputs() {
        $requestingClient = $this->getParameter(‘client’);
        $newPlan = $this->getParameter(‘newPlan’);
        // Inactive plans can only be assigned from support admin
        if (!$newPlan->isActive() && $requestingClient !==  ‘SUPPORT_ADMIN’) {
            $this->addErrorMessage(“invalid_parameter”,      ‘inactive_plan_not_allowed’, “The plan {$newPlan->getName} is not active.”);
        }
    }
    protected function execute() {
        // The code here is simplified for this example
        $newPlan = $this->getParameter(‘newPlan’);
        $oldPlan = $this->getParameter(‘oldPlan’);
        $user = $this->getParameter(‘user’);
        $billingService = new BillingService();
        $upgradeFee = $newPlan->getPrice() — $oldPlan->getPrice();
        $billingService->chargeCustomer($user, $upgradeFee);
        $billingService->updatePlan($newPlan);
        $subscriptionRepository = new SubscriptionRepository();
        $subscriptionRepository->update($user->getSubscription(), $newPlan);
    }
}